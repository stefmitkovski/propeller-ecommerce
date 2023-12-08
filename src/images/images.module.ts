import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { Product } from 'src/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImageController } from './images.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,Image])
  ],
  providers: [ImagesResolver, ImagesService],
  controllers: [ImageController]
})
export class ImagesModule {}
