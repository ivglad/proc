import { Module } from '@nestjs/common'
import { ForOfService } from './for-of.service'

@Module({
  providers: [ForOfService],
})
export class ForOfModule {}
