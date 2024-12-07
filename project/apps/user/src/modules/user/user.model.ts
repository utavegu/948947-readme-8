import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAuthUser, UserRoleEnum } from '@project/core';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements IAuthUser {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: true,
  })
  public lastname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
  })
  public dateOfBirth: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRoleEnum,
    default: UserRoleEnum.User,
  })
  public role: UserRoleEnum;

  @Prop()
  public avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
