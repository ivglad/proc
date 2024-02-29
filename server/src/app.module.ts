import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION, {
      dbName: process.env.DB_NAME,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
