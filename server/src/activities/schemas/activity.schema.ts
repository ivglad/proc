import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type ActivityDocument = Activity & Document

@Schema({ _id: false })
export class ActivityOptions {
  @Prop({ default: false })
  'try-catch'?: boolean

  @Prop({ default: false })
  async?: boolean
}

@Schema({ collection: 'activities', timestamps: true, autoCreate: true })
export class Activity {
  @Prop({ type: Types.ObjectId, ref: 'Process', index: true, default: '' })
  processId: Types.ObjectId

  @Prop({ unique: true, index: true, required: true })
  title: string

  @Prop({ required: true })
  type: string

  @Prop({ default: '' })
  group: string

  @Prop({ required: true })
  position: string

  @Prop({ type: ActivityOptions })
  options: ActivityOptions

  @Prop({ default: new Date(), set: (v: Date) => new Date() })
  createdAt: Date

  @Prop({ default: new Date(), set: (v: Date) => new Date() })
  updatedAt: Date
}

export const ActivitySchema = SchemaFactory.createForClass(Activity)
