import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type TaskDocument = Task & Document

@Schema({ _id: false })
export class TaskSchedule {
  @Prop({ required: true })
  cron: string
}

@Schema({ _id: false })
export class TaskError {
  @Prop({ type: Types.ObjectId, default: '' })
  activityId?: Types.ObjectId | ''

  @Prop({ default: '' })
  message: string

  @Prop({ default: '' })
  trace: string
}

@Schema({ collection: 'tasks', timestamps: true, autoCreate: true })
export class Task {
  @Prop({ unique: true, index: true, required: true })
  title: string

  @Prop({
    type: String,
    default: 'disabled',
    enum: ['disabled', 'enabled', 'error', 'not found'],
  })
  status: string

  @Prop({ default: '' })
  group: string

  @Prop({ type: TaskSchedule, required: true })
  schedule: TaskSchedule

  @Prop({ type: TaskError, default: () => ({}) })
  error: TaskError

  @Prop({ type: Types.ObjectId, ref: 'User', index: true, required: true })
  ownerId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Process', index: true, default: '' })
  processId: Types.ObjectId

  @Prop({ default: new Date(), set: (v: Date) => new Date() })
  createdAt: Date

  @Prop({ default: new Date(), set: (v: Date) => new Date() })
  updatedAt: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)
