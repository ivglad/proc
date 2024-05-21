import { Types } from 'mongoose'
import {
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator'

export class ActivityDto {
  @IsNotEmpty()
  processId: Types.ObjectId

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  type: string

  @IsOptional()
  group?: string

  @IsNotEmpty()
  position: string

  @IsObject()
  @IsOptional()
  @ValidateNested({ each: true })
  options?: {
    'try-catch'?: boolean
    async?: boolean
  }

  @IsDate()
  @IsOptional()
  readonly createdAt?: Date

  @IsDate()
  @IsOptional()
  readonly updatedAt?: Date
}
