import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DbRequest, DbRequestSchema } from './schemas/db-request.schema'
import { DbRequestService } from './db-request.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbRequest.name, schema: DbRequestSchema },
    ]),
  ],
  providers: [DbRequestService],
  exports: [DbRequestService],
})
export class DbRequestModule {}
