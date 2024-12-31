import { BaseEntity, IPost, IStorableEntity } from '@project/core';
import { BlogCommentEntity } from '../blog-comment/blog-comment.entity';
import { BlogCommentFactory } from '../blog-comment/blog-comment.factory';
import { BlogCategoryEntity } from '../blog-category/blog-category.entity';
import { BlogCategoryFactory } from '../blog-category/blog-category.factory';

export class BlogPostEntity extends BaseEntity implements IStorableEntity<IPost> {
  public title: string;
  public categories: BlogCategoryEntity[]
  public description: string;
  public content: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  // Во взрослом проекте так лучше не делать, а просто при необходимости запрашивать комментарии по id поста. И лучше также пагинацией - штук по 10 за раз, остальное по востребованию.
  public comments: BlogCommentEntity[];

  constructor(post?: IPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IPost): void {
    if (! post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.userId = post.userId;
    this.description = post.description;
    this.categories = [];
    this.comments = [];

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

    const blogCategoryFactory = new BlogCategoryFactory();
    for (const category of post.categories) {
      const blogCategoryEntity = blogCategoryFactory.create(category);
      this.categories.push(blogCategoryEntity);
    }
  }

  public toPOJO(): IPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
      title: this.title,
      content: this.content,
      userId: this.userId,
      categories: this.categories.map((categoryEntity) => categoryEntity.toPOJO()),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    }
  }
}
