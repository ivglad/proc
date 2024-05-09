import { Types } from 'mongoose'
import { IsNotEmpty, IsString, IsDate, IsObject } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  title: string

  @IsString()
  status?: string

  @IsString()
  group?: string

  @IsObject()
  @IsNotEmpty()
  schedule: {
    cron: string
  }

  @IsObject()
  error?: {
    activity: string
    message: string
    trace: string
  }

  @IsNotEmpty()
  ownerId: Types.ObjectId

  @IsString()
  processId: Types.ObjectId

  @IsDate()
  createdAt?: Date

  @IsDate()
  updatedAt?: Date
}
