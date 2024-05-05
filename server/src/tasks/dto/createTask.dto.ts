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
  schedule: object

  @IsObject()
  error?: object

  @IsNotEmpty()
  ownerId: string

  @IsString()
  processId: string

  @IsDate()
  createdAt?: Date

  @IsDate()
  updatedAt?: Date
}
