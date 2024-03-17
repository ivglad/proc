import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true, autoCreate: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: '' })
  name: string

  @Prop({ default: '' })
  refreshToken: string

  @Prop({ default: 'spectator' })
  role: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
