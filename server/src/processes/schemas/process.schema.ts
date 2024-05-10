import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type ProcessDocument = Process & Document

@Schema({ _id: false })
export class ProcessError {
  @Prop({ type: Types.ObjectId, ref: 'Activity', default: '' })
  activityId: Types.ObjectId

  @Prop({ default: '' })
  message: string

  @Prop({ default: '' })
  trace: string
}

@Schema({ collection: 'processes', timestamps: true, autoCreate: true })
export class Process {
  @Prop({ unique: true, index: true, required: true })
  title: string

  @Prop({ default: '', enum: ['', 'running', 'paused', 'error'] })
  status: string

  @Prop({ default: '' })
  group: string

  @Prop({ type: Types.ObjectId, ref: 'User', index: true, required: true })
  ownerId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Task', index: true, default: '' })
  taskId: Types.ObjectId

  @Prop({ type: [ProcessError], default: () => [] })
  activitiesErrors: [ProcessError]

  @Prop({ default: new Date(), set: (v: Date) => new Date() })
  createdAt: Date

  @Prop({ default: new Date(), set: (v: Date) => new Date() })
  updatedAt: Date
}

export const ProcessSchema = SchemaFactory.createForClass(Process)
