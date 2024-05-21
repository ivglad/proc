import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ActivityDto } from './dto/activity.dto'
import { Activity, ActivityDocument } from './schemas/activity.schema'
import {
  DbRequest,
  DbRequestDocument,
} from '../activities-list/db-request/schemas/db-request.schema'

@Injectable()
export class ActivitiesService {
  private readonly logger = new Logger(ActivitiesService.name)
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  create(activityDto: ActivityDto) {}
}
