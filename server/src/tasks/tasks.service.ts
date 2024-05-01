import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTaskDto } from './dto/createTask.dto'
import { UpdateTaskDto } from './dto/updateTask.dto'
import { Task, TaskDocument } from './schemas/task.schema'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  // @Cron('*/2 * * * * *')
  // handleCron() {
  //   this.logger.debug('This task runs every 2 seconds')
  // }

  create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto)
    return createdTask.save()
  }
}
