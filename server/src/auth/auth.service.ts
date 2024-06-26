import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userEmailExists = await this.usersService.findByEmail(
      createUserDto.email,
    )
    if (userEmailExists) {
      throw new BadRequestException('Данный email уже существует')
    }
    const userNameExists = await this.usersService.findByUsername(
      createUserDto.username,
    )
    if (userNameExists) {
      throw new BadRequestException('Данный никнейм уже существует')
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password)
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    })

    const tokens = await this.getTokens(newUser.id, newUser.email)
    await this.updateRefreshToken(newUser.id, tokens.refreshToken)
    return {
      username: newUser.username,
      name: newUser.name,
    }
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.findByEmail(data.email)
    if (!user) {
      throw new BadRequestException('Пользователь не найден')
    }
    const passwordMatches = await argon2.verify(user.password, data.password)
    if (!passwordMatches) {
      throw new BadRequestException('Неверный пароль')
    }
    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return {
      username: user.username,
      name: user.name,
      role: user.role,
      ...tokens,
    }
  }

  async logout(userId: string) {
    return await this.usersService.update(userId, { refreshToken: null })
  }

  hashData(data: string) {
    return argon2.hash(data)
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await this.usersService.update(userId, { refreshToken: hashedRefreshToken })
  }

  async getTokens(userId: string | unknown, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '1m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '30d',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId)
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Недостаточно прав')
    }
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    )
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Недостаточно прав')
    }
    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }
}
