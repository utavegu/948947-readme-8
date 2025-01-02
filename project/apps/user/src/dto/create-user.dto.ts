import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsString } from 'class-validator';
import { AuthenticationValidateMessage } from '@project/core';

export class CreateUserDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AuthenticationValidateMessage.DateBirthNotValid })
  public dateBirth: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Семён',
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Петрищев'
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'Пароль для доступа к учётной записи',
    example: 'secret123'
  })
  @IsString()
  public password: string;
}
