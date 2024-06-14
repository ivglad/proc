import { Types } from 'mongoose'
import { IsNotEmpty, IsArray, IsOptional } from 'class-validator'
import { ActivityDto } from '../../../activities/dto/activity.dto'

export class DbRequestDto extends ActivityDto {
  @IsNotEmpty()
  method: string

  @IsArray()
  @IsOptional()
  parameters?: [unknown]

  @IsOptional()
  response?: unknown
}
