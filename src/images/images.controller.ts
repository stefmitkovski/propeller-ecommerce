import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { ImagesService } from './images.service';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImagesService){}

    @Get()
    getImages(){
        return this.imageService.findAll()
    }

    @Get(':id')
    getImage(@Param('id') id: number){
        try{
            return this.imageService.findOne(id)
        }catch(err){
            throw new NotFoundException()
        }
    }

    @Post()
    createImage(@Body(new ValidationPipe()) createImageInput: CreateImageInput){
        return this.imageService.create(createImageInput)
    }

    @Put(':id')
    updateImage(@Param('id') id: number, @Body() updateImageInput: UpdateImageInput){
        return this.imageService.update(id, updateImageInput)
    }

    @Delete(':id')
    removeImage(@Param('id') id: number){
        return this.imageService.remove(id)
    }

}
