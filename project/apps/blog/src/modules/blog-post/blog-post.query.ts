import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { SortDirection } from '@project/core';

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_PAGE_COUNT
} from './blog-post.constant';


export class BlogPostQuery {
  // Тут лучше усложнить валидацию. Например, запретить отправлять слишком большое число, отрицательные числа и т.д.
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public categories?: string[];

  // Проверяет, что значение равно какому-то из енумки. Вроде ещё есть декоратор для енумок похожий... Или путаю со сваггером или ентитями тайпорма
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
