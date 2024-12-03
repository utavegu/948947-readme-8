import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('file')
export class FileController {
  constructor(
    // private readonly fileService: FileService
  ) { }

  // @Get()
  // getData() {
  //   return this.userService.getData();
  // }

  @Post()
  createUser() { }

  @Get()
  getAllUsers() { }

  @Get()
  getUserById() { }

  @Put()
  editUser() { }

  @Delete()
  deleteUser() { }
}
