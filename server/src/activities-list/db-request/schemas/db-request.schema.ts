import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Activity } from '../../../activities/schemas/activity.schema'

export type DbRequestDocument = DbRequest & Document

export class DbRequestResponse {
  response: unknown | null
}

@Schema({
  collection: 'activities',
  timestamps: true,
  autoCreate: true,
})
export class DbRequest extends Activity {
  @Prop({ default: 'find', enum: ['find', 'findOne'] })
  method: string

  @Prop({ default: () => [{}] })
  parameters: [unknown]

  @Prop({ type: DbRequestResponse, default: null })
  response: DbRequestResponse
}

export const DbRequestSchema = SchemaFactory.createForClass(DbRequest)
