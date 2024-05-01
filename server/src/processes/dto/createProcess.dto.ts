import { IsNotEmpty, IsString, IsDate } from 'class-validator'

export class CreateProcessDto {
  @IsNotEmpty()
  @IsString()
  owner: string

  @IsString()
  group?: string

  @IsString()
  task?: string

  @IsDate()
  createdAt?: Date

  @IsDate()
  updatedAt?: Date
}
