import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('comment')
export class СommentController {
  constructor(
    // private readonly commentService: СommentService
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
