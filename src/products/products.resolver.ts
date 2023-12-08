import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product,{nullable: true})
  createProduct(@Args('input') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product, {nullable: true})
  updateProduct(@Args('id', {type: () => ID}) id: number , @Args('input') updateProductInput: UpdateProductInput) {
    
    return this.productsService.update(id, updateProductInput);
  }

  @Mutation(() => Product, {nullable: true})
  deleteProduct(@Args('id', { type: () => ID }) id: number) {
    return this.productsService.remove(id);
  }
}
