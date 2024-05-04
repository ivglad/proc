import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SchedulerRegistry, Cron } from '@nestjs/schedule'
import { CronJob } from 'cron'
import { CreateTaskDto } from './dto/createTask.dto'
import { UpdateTaskDto } from './dto/updateTask.dto'
import { Task, TaskDocument } from './schemas/task.schema'
import { ProcessesService } from '../processes/processes.service'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.tasksInit()
  }

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto)
    this.taskHandler(createTaskDto)
    return createdTask.save()
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    this.taskHandler(updateTaskDto)

    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, {
        new: true,
      })
      .exec()
  }

  async remove(id: string): Promise<TaskDocument> {
    return this.taskModel.findByIdAndDelete(id).exec()
  }

  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec()
  }

  async findById(id: string): Promise<TaskDocument> {
    return this.taskModel.findById(id)
  }

  taskHandler(taskDto: UpdateTaskDto) {
    this.logger.debug(taskDto._id)
    // if (taskDto.status === 'enabled') {
    //   this.addCronJob(taskDto)
    // } else if (taskDto.status === 'disabled') {
    //   this.deleteCronJob(taskDto._id)
    // }
  }

  async tasksInit() {
    const tasks = await this.findAll()
    tasks.forEach((task) => {
      if (task.status !== 'enabled') return
      try {
        // this.addCronJob(task)
      } catch (e) {
        this.logger.error(`Task ${task.title}-${task._id} error: ${e.message}`)
      }
    })
  }

  addCronJob(task: TaskDocument) {
    const job = new CronJob(task.schedule.cron, () => {
      this.logger.debug('task execute')
    })

    this.schedulerRegistry.addCronJob(task._id, job)
    job.start()
  }

  deleteCronJob(taskId: string) {
    this.schedulerRegistry.deleteCronJob(taskId)
  }
}
