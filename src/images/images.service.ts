import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { relative } from 'path';
import { Repository } from 'typeorm';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>){}
  
  create(createImageInput: CreateImageInput) {
    const newImage = this.imageRepository.create(createImageInput);
    return this.imageRepository.save(newImage)
  }

  findAll() {
    return this.imageRepository.find({relations: ['product']})
  }

  async findOne(id: number) {
    return await this.imageRepository.findOne({where: {id}, relations: ['product']});
  }

  async update(id: number, updateImageInput: UpdateImageInput) {
    const updateImage = await this.imageRepository.findOneBy({id});

    if (!updateImage) {
      throw new Error('There isn\'t any images with that ID ');
    }

    Object.assign(updateImage, updateImageInput);

    const updatedImage = this.imageRepository.save(updateImage);

    return updatedImage;
  }

  async remove(id: number) {
    const deleteImage = await this.imageRepository.findOneBy({id});
    if (!deleteImage){
      throw new Error('There isn\'t any images with that ID ')
    }

    this.imageRepository.remove(deleteImage)
    return deleteImage
  }
}
