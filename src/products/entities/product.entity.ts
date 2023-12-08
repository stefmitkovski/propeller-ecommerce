import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Image } from 'src/images/entities/image.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusEnum {
  Active = 'active',
  Inactive = 'inactive',
}

registerEnumType(StatusEnum, { name: 'StatusEnum' });

@Entity({name:'Product'})
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({nullable: false, type: 'float'})
  @Field(() => Number)
  price: number

  @Column({type: 'enum', enum: StatusEnum, default: StatusEnum.Active})
  @Field(() => StatusEnum,{defaultValue: StatusEnum.Active})
  status: StatusEnum

  @OneToMany(() => Image, image => image.product, {cascade: true})
  @JoinColumn()
  @Field(() => [Image], {nullable: true})
  images?: Image[]
}
