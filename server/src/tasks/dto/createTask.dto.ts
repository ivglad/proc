import { Types } from 'mongoose'
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  group?: string

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  schedule: {
    cron: string
  }

  @IsObject()
  @ValidateNested({ each: true })
  @IsOptional()
  error?: {
    activityId?: Types.ObjectId | ''
    message: string
    trace: string
  }

  @IsNotEmpty()
  ownerId: Types.ObjectId

  @IsString()
  processId: Types.ObjectId

  @IsDate()
  @IsOptional()
  readonly createdAt?: Date

  @IsDate()
  @IsOptional()
  readonly updatedAt?: Date
}
