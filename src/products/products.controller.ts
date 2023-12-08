import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductsService){}

    @Get()
    getProducts(){
        return this.productService.findAll()
    }

    @Get(':id')
    getProduct(@Param('id') id: number){
        try{
            return this.productService.findOne(id)
        }catch(err){
            throw new NotFoundException()
        }
    }

    @Post()
    createProduct(@Body(new ValidationPipe()) createProductInput: CreateProductInput){
        return this.productService.create(createProductInput)
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() updateProductInput: UpdateProductInput){
        return this.productService.update(id, updateProductInput)
    }

    @Delete(':id')
    removeProduct(@Param('id') id: number){
        return this.productService.remove(id)
    }

}
