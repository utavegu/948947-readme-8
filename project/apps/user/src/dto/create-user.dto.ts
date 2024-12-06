import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '1981-03-12',
  })
  public dateBirth: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Семён',
  })
  public firstname: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Петрищев'
  })
  public lastname: string;

  @ApiProperty({
    description: 'Пароль для доступа к учётной записи',
    example: 'secret123'
  })
  public password: string;
}
