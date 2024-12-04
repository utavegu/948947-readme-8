import {
  BaseEntity,
  IStorableEntity,
} from '@project/core';
import { IPublication } from './typespaces/publication.interface';

export class PublicationEntity extends BaseEntity implements IStorableEntity<IPublication> {
  public author: string;
  public createDate: Date;
  public title: string;
  public content: string;

  constructor(publication?: IPublication) {
    super();
    this.populate(publication);
  }

  public populate(publication?: IPublication): void {
    if (!publication) {
      return;
    }

    this.id = publication.id ?? '';
    this.author = publication.author;
    this.createDate = publication.createDate;
    this.title = publication.title;
    this.content = publication.content;
  }

  public toPOJO(): IPublication {
    return {
      id: this.id,
      author: this.author,
      createDate: this.createDate,
      title: this.title,
      content: this.content,
    }
  }
}
