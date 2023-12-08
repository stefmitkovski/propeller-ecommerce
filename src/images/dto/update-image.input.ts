import { Field, ID, InputType, Int, PartialType } from "@nestjs/graphql";
import { Product } from "src/products/entities/product.entity";
import { CreateImageInput } from "./create-image.input";

@InputType()
export class UpdateImageInput extends PartialType(CreateImageInput) {

  @Field(() => ID, {nullable: true})
  id: number;
  
  @Field(() => String,{nullable: true})
  url: String
  
  @Field(() => Int,{nullable: true})
  priority: number
  
}
