import { Injectable } from '@nestjs/common';

import { IEntityFactory, IPost } from '@project/core';

import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogCategoryEntity } from '../blog-category/blog-category.entity';

@Injectable()
export class BlogPostFactory implements IEntityFactory<BlogPostEntity> {
  public create(entityPlainData: IPost): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto, categories: BlogCategoryEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.categories = categories;
    entity.title = dto.title;
    entity.description = dto.description;
    entity.content = dto.content;
    entity.userId = dto.userId;
    entity.comments = [];

    return entity;
  }
}
