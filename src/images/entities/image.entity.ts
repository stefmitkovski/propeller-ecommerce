import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Image'})
@ObjectType()
export class Image {

  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({nullable: true})
  @Field(() => String)
  url: String

  @Column({default: 1000, nullable: true})
  @Field(() => Int,{defaultValue: 1000})
  priority: number

  @ManyToOne(() => Product, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'product_id',referencedColumnName: 'id'})
  @Field(() => Product,{nullable: true})
  product?: Product
}
