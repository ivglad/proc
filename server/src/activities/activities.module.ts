import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Activity, ActivitySchema } from './schemas/activity.schema'
import {
  DbRequest,
  DbRequestSchema,
  } from '../activities-list/db-request/schemas/db-request.schema'
import { ActivitiesService } from './activities.service'
import { ActivitiesController } from './activities.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
      { name: DbRequest.name, schema: DbRequestSchema },
    ]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
