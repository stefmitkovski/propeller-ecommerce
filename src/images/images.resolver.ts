import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => Image,{nullable: true})
  createImage(@Args('input') createImageInput: CreateImageInput) {
    return this.imagesService.create(createImageInput);
  }

  @Query(() => [Image], { name: 'images'})
  findAll() {
    return this.imagesService.findAll();
  }

  @Query(() => Image, { name: 'image', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => Image,{nullable: true})
  updateImage(@Args('id',{ type: () => ID }) id: number ,@Args('input') updateImageInput: UpdateImageInput) {
    return this.imagesService.update(id, updateImageInput);
  }

  @Mutation(() => Image, {nullable: true})
  deleteImage(@Args('id', { type: () => ID }) id: number) {
    return this.imagesService.remove(id);
  }
}
