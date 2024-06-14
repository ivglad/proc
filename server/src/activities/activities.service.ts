import { Injectable, Logger, BadRequestException } from '@nestjs/common'
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
    @InjectModel(DbRequest.name)
    private dbRequestModel: Model<DbRequestDocument>,
  ) {}

  async create(activityDto: ActivityDto) {
    this.logger.debug('Creating activity', activityDto)

    let activity: ActivityDocument | DbRequestDocument

    try {
      if (activityDto.type === 'DbRequest') {
        activity = new this.dbRequestModel(activityDto)
      }

      const result = await activity.save()
      return result
    } catch (e) {
      throw new BadRequestException(
        e.message,
        'Ошибка создания активности, проверьте корректность данных',
      )
    }
  }

  async update(id: string, activityDto: ActivityDto) {}

  async remove(id: string): Promise<boolean> {
    let status = true
    try {
    } catch (e) {
      status = false
      this.logger.error(`[remove] ID:${id} - ${e.message}`)
    } finally {
      return status
    }
  }
}
