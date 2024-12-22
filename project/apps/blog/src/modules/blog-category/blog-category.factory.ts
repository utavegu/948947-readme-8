import { Injectable } from '@nestjs/common';

import { ICategory, IEntityFactory } from '@project/core';
import { BlogCategoryEntity } from './blog-category.entity';

@Injectable()
export class BlogCategoryFactory implements IEntityFactory<BlogCategoryEntity> {
  public create(entityPlainData: ICategory): BlogCategoryEntity {
    return new BlogCategoryEntity(entityPlainData);
  }
}
