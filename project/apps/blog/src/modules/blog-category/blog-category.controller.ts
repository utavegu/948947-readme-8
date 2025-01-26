import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { BlogCategoryService } from './blog-category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRdo } from './rdo/category.rdo';

@Controller('categories')
export class BlogCategoryController {
  constructor(
    private readonly blogCategoryService: BlogCategoryService
  ) {}

  // Работает, отдаёт целевую категоию (тайтл и айдишник)
  @Get('/:id')
  public async show(@Param('id') id: string) {
    console.log(id);
    const categoryEntity = await this.blogCategoryService.getCategory(id);
    return fillDto(CategoryRdo, categoryEntity.toPOJO());
  }

  // Работает, отдаёт массив категорий (тайтл и айдишник)
  @Get('/')
  public async index() {
    const blogCategoryEntities = await this.blogCategoryService.getAllCategories();
    const categories = blogCategoryEntities.map((blogCategory) => blogCategory.toPOJO());
    return fillDto(CategoryRdo, categories);
  }

  // Работает
  @Post('/')
  public async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.blogCategoryService.createCategory(dto);
    return fillDto(CategoryRdo, newCategory.toPOJO());
  }

  // Работает
  @Delete('/:id')
  // Это правильный код для делита, да? По ресту? Раз он тут прямо руками выставлен - видимо да
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogCategoryService.deleteCategory(id);
  }

  // Почему-то не находит по айди. Через гет с тем же айди находит нормально
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.blogCategoryService.updateCategory(id, dto);
    return fillDto(CategoryRdo, updatedCategory.toPOJO());
  }
}
