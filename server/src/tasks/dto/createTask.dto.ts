import { IsNotEmpty, IsString, IsDate } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  process: string

  @IsNotEmpty()
  @IsString()
  owner: string

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
