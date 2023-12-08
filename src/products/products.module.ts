import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Image } from 'src/images/entities/image.entity';
import { ProductController } from './products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,Image])
],
  providers: [ProductsResolver, ProductsService],
  controllers: [ProductController],
})
export class ProductsModule {}
