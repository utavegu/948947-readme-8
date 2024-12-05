// видео, текст, цитата, фото, ссылка

export abstract class BasePublicationDto {
  public author: string;
  public title: string;
  public content: string;
  public tags?: string;
}

class TextPublicationDto extends BasePublicationDto {
  announcement: string;
}

class VideoPublicationDto extends BasePublicationDto {
  videoLink: string;
}

class PhotoPublicationDto extends BasePublicationDto {
  photo: string;
}

export type CreatePublicationDto = TextPublicationDto | VideoPublicationDto | PhotoPublicationDto;
// по итогу понадобятся тайпгарды, скорее всего
