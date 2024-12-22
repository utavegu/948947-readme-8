import { ICategory } from './category.interface';
import { IComment } from './comment.interface';

export interface IPost {
  id?: string;
  title: string;
  categories: ICategory[];
  description: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  comments: IComment[];
}
