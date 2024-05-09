import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
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
    this.init()
  }

  async init() {
    const tasks = await this.findByStatus('enabled')
    tasks.forEach(async (task) => {
      const job = this.getCronJob(task._id)
      if (!job) {
        this.logger.warn(
          `[init] ID:${task._id} - Задача не зарегистрирована. Изменение статуса в БД...`,
        )
        this.update(task._id, { status: 'not found' })
        return
      }
      await this.start(task._id, task)
    })
  }

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto)
    createdTask.status = 'disabled'
    return createdTask.save()
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const handledUpdateTaskDto = await this.taskHandler(id, updateTaskDto)
    const task = await this.taskModel
      .findByIdAndUpdate(id, handledUpdateTaskDto, {
        new: true,
      })
      .exec()

    if (task.status === 'error') {
      throw new BadRequestException(task.error.message, task.error.trace)
    }

    return task
  }

  async taskHandler(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    if (updateTaskDto?.status === 'enabled') {
      return await this.start(id, updateTaskDto)
    }
    return await this.stop(id, updateTaskDto)
  }

  async start(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    try {
      let cron: string
      let processId: Types.ObjectId
      if (updateTaskDto?.schedule?.cron) cron = updateTaskDto.schedule.cron
      if (updateTaskDto?.processId) processId = updateTaskDto.processId
      if (!cron || !processId) {
        const task = await this.taskModel.findById(
          id,
          'processId schedule.cron',
        )
        cron = cron ? cron : task?.schedule?.cron
        processId = processId ? processId : task?.processId
      }

      const job = new CronJob(cron, () => {
        this.logger.debug(`[start] Task ${id} execute`)
        // ProcessesService.start(processId) // TODO: call task
      })

      const oldJob = this.getCronJob(id)
      if (oldJob) {
        oldJob.stop()
        this.schedulerRegistry.deleteCronJob(id)
      }

      this.schedulerRegistry.addCronJob(id, job)
      job.start()

      updateTaskDto.status = 'enabled'
      updateTaskDto.error = {
        activity: '',
        message: '',
        trace: '',
      }
    } catch (e) {
      updateTaskDto.status = 'error'
      updateTaskDto.error = {
        activity: '',
        message: 'Невозможно запустить задачу (некорректная cron строка)',
        trace: e.message,
      }
      this.logger.warn(`[startTask] ID:${id} - ${e.message}`)
    } finally {
      return updateTaskDto
    }
  }

  async stop(id: string, updateTaskDto: UpdateTaskDto): Promise<UpdateTaskDto> {
    try {
      const oldJob = this.getCronJob(id)
      if (oldJob) {
        oldJob.stop()
        updateTaskDto.status = 'disabled'
        updateTaskDto.error = {
          activity: '',
          message: '',
          trace: '',
        }
      }
    } catch (e) {
      updateTaskDto.status = 'error'
      updateTaskDto.error = {
        activity: '',
        message: 'Невозможно остановить задачу',
        trace: e.message,
      }
      this.logger.error(`[stop] ID:${id} - ${e.message}`)
    } finally {
      return updateTaskDto
    }
  }

  async remove(id: string): Promise<boolean> {
    let status = true
    try {
      const oldJob = this.getCronJob(id)
      if (oldJob) {
        oldJob.stop()
        this.schedulerRegistry.deleteCronJob(id)
      }
      await this.taskModel.findByIdAndDelete(id).exec()
    } catch (e) {
      status = false
      this.logger.error(`[remove] ID:${id} - ${e.message}`)
    } finally {
      return status
    }
  }

  getCronJob(id: string): CronJob | null {
    try {
      return this.schedulerRegistry.getCronJob(id)
    } catch (e) {
      return null
    }
  }

  async findById(id: string): Promise<TaskDocument> {
    return this.taskModel.findById(id).exec()
  }

  async findByStatus(searchStatus: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ status: searchStatus }).exec()
  }
}
