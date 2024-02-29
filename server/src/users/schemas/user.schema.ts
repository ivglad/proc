import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true, autoCreate: true })
export class User {
  @Prop({ required: true })
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
}

export const UserSchema = SchemaFactory.createForClass(User)
