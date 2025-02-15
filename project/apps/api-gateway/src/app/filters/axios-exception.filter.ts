/*
Если сервис `Account` ответит кодом ошибки (например, 401), то Axios бросит исключение.
Его необходимо обработать. Это можно сделать в теле обработчика, заключив в блок try/catch или сделав Exception Filter. Второй вариант более универсальный и гибкий.

Exception Filter (фильтр исключений) представляет собой механизм для обработки исключений, возникающих во время обработки HTTP-запросов. Он предоставляет возможность перехватить и обработать исключение до того, как оно будет отправлено обратно в клиентское приложение.

Exception Filter в Nest представлен классом, который должен реализовывать интерфейс ExceptionFilter из пакета @nestjs/common. Классы фильтров исключений могут использоваться вместе с декоратором @UseFilters для применения фильтра ко всем обработчикам запросов в определенном контроллере или глобально для всего приложения.
Основная задача Exception Filter состоит в том, чтобы перехватывать выброшенные исключения и принимать решение о том, как на них реагировать. Например, фильтр может логировать исключение, отправить пользователю определенный ответ с ошибкой или выполнить другую необходимую логику.
*/

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

// лучше не тут, а где-нибудь в либе констант, но для простоты пусть будет тут
const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

// Обращаю внимание на этот декоратор - говорит перехватывать и отрабатывать только на такой тип ошибок
@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE;

    response
      .status(status)
      .json({
        statusCode: status,
        message,
      });
  }
}
