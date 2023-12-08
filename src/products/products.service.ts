import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/images/entities/image.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Image) private imageRepository: Repository<Image>
    ){}
  
    async create(createProductInput: CreateProductInput){
      const { images, ...productData } = createProductInput;
  
      const newProduct = this.productRepository.create(productData);
      const savedProduct = await this.productRepository.save(newProduct);
  
      if (images && images.length > 0) {
        const productImages = await Promise.all(
          images.map(async imageData => {

            // if an image ID is present
            if(imageData.id){
              const existingImage = await this.imageRepository.findOneBy({id: imageData.id})
              // if there is an existing image with that ID
              if (existingImage){
                return this.imageRepository.save(existingImage);
              }
            }
        
            // if not create a new image
            const newImage = this.imageRepository.create({ ...imageData, product: savedProduct});
            return this.imageRepository.save(newImage);
          }),
        );
  
        savedProduct.images = productImages;
        await this.productRepository.save(savedProduct);
      }
  
      return savedProduct;
    }

  findAll() {
    return this.productRepository.find({relations: ['images']});
  }

  async findOne(id: number) {
    return await this.productRepository.findOne( {where: {id}, relations: ['images']} );
  }

  async update(id: number, updateProductInput: UpdateProductInput): Promise<Product> {
    const productToUpdate = await this.productRepository.findOne({where: {id}, relations: ['images'] });

    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found`);
    }

    if (updateProductInput.images !== undefined) {
      const updatedImages = await Promise.all(
        updateProductInput.images.map(async imageData => {
          if (imageData.id) {
            const existingImage = productToUpdate.images.find(img => img.id === imageData.id);
            if (existingImage) {
              Object.assign(existingImage, imageData);
              return existingImage;
            }else{
              return this.imageRepository.findOneBy({id: imageData.id})
            }          
          } else {
            const newImage = this.imageRepository.create({
              ...imageData,
              product: productToUpdate,
            });
            return this.imageRepository.save(newImage);
          }
        }),
      );

      productToUpdate.images = updatedImages;
    }

    
    const updatedProduct = await this.productRepository.save({...productToUpdate, ...UpdateProductInput});

    return updatedProduct;
  }

  async remove(id: number) {
    const deleteProduct = await this.productRepository.findOneBy({id});
    if (!deleteProduct){
      throw new Error('There isn\'t any products with that ID ')
    }

    this.productRepository.remove(deleteProduct)
    return deleteProduct 
  }
}
