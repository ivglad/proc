import { Types } from 'mongoose'
import { IsNotEmpty, IsString, IsDate } from 'class-validator'

export class CreateTaskDto {
  _id: Types.ObjectId

  @IsString()
  processId: string

  @IsNotEmpty()
  ownerId: string

  @IsNotEmpty()
  title: string

  @IsString()
  group?: string

  @IsString()
  status?: string

  @IsNotEmpty()
  schedule: object

  @IsDate()
  createdAt?: Date

  @IsDate()
  updatedAt?: Date
}
