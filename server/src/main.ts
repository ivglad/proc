import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  })
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  await app.listen(3000)
}
bootstrap()
