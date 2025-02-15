/*
Для многих ресурсов необходимо выполнять проверку JWT-токена. Например,
чтобы добавить публикацию через сервис управления блогами, мы
должны быть уверены, что клиент прислал валидный токен. Как проверить токен?

Для этого необходимо использовать сервис users. В прошлом шаге мы предусмотрели
в нём отдельный ресурс для проверки токена. Схема получается следующей: запрос клиента
приходит в API, затем необходимо извлечь из него заголовок authorization, сбегать с ним
в users к ресурсу /check, и если всё хорошо, то только тогда выполнять
запрос к сервису управления блогами.

Выходит, что эту логику необходимо дублировать во многих обработчиках. Чтобы
этого избежать, мы создадим отдельный CheckAuthGuard. Напишем в нём логику
проверки токена. В случае успеха, добавим в объект запроса информацию о
пользователе.
*/

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/check`, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    })

    request['user'] = data;
    return true;
  }
}
