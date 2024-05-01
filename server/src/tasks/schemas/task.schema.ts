import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TaskDocument = Task & Document

@Schema({ _id: false })
class Schedule {
  @Prop({ required: true })
  cron: string
}

@Schema({ collection: 'tasks', timestamps: true, autoCreate: true })
export class Task {
  @Prop({ required: true })
  process: string

  @Prop({ required: true })
  owner: string

  @Prop({ default: '' })
  group: string

  @Prop({ default: 'disabled' })
  status: string

  @Prop({ type: Schedule, required: true })
  schedule: Schedule

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)
