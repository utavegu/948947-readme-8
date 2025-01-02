import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AuthenticationValidateMessage } from '@project/core';

export class LoginUserDto {
  @ApiProperty({
    description: 'Почта(логин) для доступа к учётной записи',
    example: 'vasiliy1990@mail.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'Пароль для доступа к учётной записи',
    example: 'secret123'
  })
  @IsString()
  public password: string;
}
