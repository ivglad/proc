import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { ActivitiesService } from './activities.service'
import { ActivityDto } from './dto/activity.dto'

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('create')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  @HttpCode(HttpStatus.CREATED)
  create(@Body() activityDto: ActivityDto) {
    return this.activitiesService.create(activityDto)
  }
}
