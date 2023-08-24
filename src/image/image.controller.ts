import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('get')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
  return res.sendFile(image, { root: './image' });
}
}
