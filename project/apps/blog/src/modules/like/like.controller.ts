import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('like')
export class LikeController {
  constructor(
    // private readonly likeService: LikeService
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
