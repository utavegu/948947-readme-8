import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './typespaces/dto/create-publication.dto';

@Controller('publication')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService
  ) { }

  @Post()
  createPublication(
    @Body() dto: CreatePublicationDto
  ) {
    this.publicationService.createPublication(dto)
  }

  @Get()
  getPublicationInfo() {
    // return this.userService.getData();
  }

  // параметры
  @Get()
  getPublicationList() {
    // return this.userService.getData();
  }

  @Get()
  findPublicationByName() {
    // return this.userService.getData();
  }

  @Put()
  editPublication() { }

  @Delete()
  removePublication() { }

}
