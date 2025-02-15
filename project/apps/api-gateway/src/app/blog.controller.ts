import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AddNewPostDto } from './dto/add-new-post.dto';
import { ApplicationServiceURL } from './app.config';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  /*
  Вот это пример того, как через апи-гэйтвэй взаимодействовать с микросервисами. Другие делай по тому же принципу. Остаётся у меня только резонный вопрос - с ними же по прежнему можно взаимодействовать и в обход апи-гэйтвэй... Если стучаться в нужный порт. Как-то бы это присечь.
  */
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseInterceptors)
  @Post('/')
  public async create(@Body() dto: AddNewPostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }

}
