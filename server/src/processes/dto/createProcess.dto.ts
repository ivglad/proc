import { Types } from 'mongoose'
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator'

export class CreateProcessDto {
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  group?: string

  @IsNotEmpty()
  ownerId: Types.ObjectId

  @IsString()
  @IsOptional()
  taskId?: Types.ObjectId

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  activitiesErrors?: [
    {
      activityId: Types.ObjectId
      message: string
      trace: string
    },
  ]

  @IsDate()
  @IsOptional()
  readonly createdAt?: Date

  @IsDate()
  @IsOptional()
  readonly updatedAt?: Date
}
