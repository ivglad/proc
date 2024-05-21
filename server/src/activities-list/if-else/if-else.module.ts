import { Module } from '@nestjs/common'
import { IfElseService } from './if-else.service'

@Module({
  providers: [IfElseService],
})
export class IfElseModule {}
