import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/models';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostFactory } from './blog-post.factory';
import { BlogCategoryModule } from '../blog-category/blog-category.module';

@Module({
  imports: [BlogCategoryModule, PrismaClientModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}
