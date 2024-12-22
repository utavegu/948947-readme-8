import { BaseEntity, IStorableEntity, ICategory } from '@project/core';

export class BlogCategoryEntity extends BaseEntity implements IStorableEntity<ICategory> {
  public title: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(category?: ICategory) {
    super();
    this.populate(category);
  }

  public populate(category?: ICategory) {
    if (! category) {
      return;
    }

    this.id = category.id ?? undefined;
    this.title = category.title;
    this.createdAt = category.createdAt ?? undefined;
    this.updatedAt = category.updatedAt ?? undefined;
  }

  public toPOJO(): ICategory {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
