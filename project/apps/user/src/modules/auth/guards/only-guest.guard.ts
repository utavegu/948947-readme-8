import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OnlyGuestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    console.log('request');
    console.log(request);

    return true;
    // if (request.isUnauthenticated()) {
    //   return true;
    // } else {
    //   throw new BadRequestException('Только неавторизованным пользователям');
    // }
  }
}
