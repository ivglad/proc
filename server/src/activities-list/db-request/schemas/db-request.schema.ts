import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Activity } from '../../../activities/schemas/activity.schema'

export type DbRequestDocument = DbRequest & Document

@Schema({
  _id: false,
  collection: 'activities',
  timestamps: true,
  autoCreate: true,
})
export class DbRequest extends Activity {
  @Prop({ default: 'find', enum: ['find', 'findOne'] })
  method: string

  @Prop({ default: () => [{}] })
  parameters: [unknown]

  @Prop({ default: null })
  result: unknown
}

export const DbRequestSchema = SchemaFactory.createForClass(DbRequest)
