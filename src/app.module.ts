import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Product } from './products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './images/entities/image.entity';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'src/schema.gql',
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'password',
    database: 'propeller_ecommerce',
    entities: [
      Product,
      Image
    ],
    synchronize: true
  }),
  ProductsModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
