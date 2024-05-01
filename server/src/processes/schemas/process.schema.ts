import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProcessDocument = Process & Document

@Schema({ collection: 'processes', timestamps: true, autoCreate: true })
export class Process {
  @Prop({ required: true })
  owner: string

  @Prop({ default: '' })
  group: string

  @Prop({ default: '' })
  task: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const ProcessSchema = SchemaFactory.createForClass(Process)
