import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { Request } from 'express'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard'
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data)
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub'])
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
