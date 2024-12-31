import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/models';
import { BlogCategoryModule } from '../blog-category/blog-category.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './blog-post.repository';

@Module({
  imports: [
    PrismaClientModule,
    BlogCategoryModule,
    BlogCommentModule
  ],
  controllers: [BlogPostController],
  providers: [
    BlogPostService,
    BlogPostRepository,
    BlogPostFactory
  ],
  exports: [BlogPostService],
})
export class BlogPostModule {}
