import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@InputType()
export class CreateImageInput {
  
  @Field(() => ID, {nullable: true})
  id: number;
  
  @Field(() => String,{nullable: true})
  url: String
  
  @Field(() => Int,{defaultValue: 1000, nullable: true})
  priority: number
  
}
