import { InputType, Field, ID } from '@nestjs/graphql';
import { CreateImageInput } from 'src/images/dto/create-image.input';
import { StatusEnum } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  
  @Field(() => Number)
  price: number;

  @Field(() => StatusEnum, { defaultValue: StatusEnum.Active, nullable: true })
  status: StatusEnum;

  @Field(() => [CreateImageInput],{nullable: true})
  images?: CreateImageInput[]
}
