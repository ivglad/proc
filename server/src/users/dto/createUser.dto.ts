import { IsNotEmpty, IsEmail, IsJWT, IsString, IsDate } from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  name?: string

  @IsJWT()
  refreshToken?: string

  @IsString()
  role?: string

  @IsDate()
  createdAt?: Date

  @IsDate()
  updatedAt?: Date
}
