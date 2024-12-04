export interface IPublication {
  id?: string;
  author: string;
  createDate: Date;
  title: string;
  content: string; // разный тип
  // likes: форейн на лайки
  // comments: форейн на комментарии
  // reposts: ?
}
