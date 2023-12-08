import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateImageInput } from 'src/images/dto/create-image.input';
import { StatusEnum } from '../entities/product.entity';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  
  @Field(() => Number, {nullable: true})
  price: number;

  @Field(() => StatusEnum, {nullable: true })
  status: StatusEnum;

  @Field(() => [CreateImageInput],{nullable: true})
  images?: CreateImageInput[]
}
