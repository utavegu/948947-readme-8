// Добавляет всем отправляемым запросам идентификатор запроса (поможет в диагностике)

import * as crypto from 'crypto';
import { Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor
} from '@nestjs/common';

export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = crypto.randomUUID();

    const request = context.switchToHttp().getRequest<Request>();
    // пользовательские заголовки, как правило, начинаются с "х-"
    request.headers['X-Request-Id'] = requestId;

    Logger.log(`[${request.method}: ${request.url}]: RequestID is ${requestId}`)
    return next.handle();
  }
}
