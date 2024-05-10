import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { SchedulerRegistry } from '@nestjs/schedule'
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
    try {
      const taskTitleExists = await this.findByTitle(createTaskDto.title, 'title')
      if (taskTitleExists) {
        throw new BadRequestException('Задача с таким именем уже существует')
      }

      const createdTask = new this.taskModel(createTaskDto)
      createdTask.status = 'disabled'
      const result = createdTask.save()
      return result
    } catch (e) {
      throw new BadRequestException(
        e.message,
        'Ошибка создания задачи, проверьте корректность данных',
      )
    }
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    try {
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
    } catch (e) {
      throw new BadRequestException(
        e.message,
        'Ошибка обновления задачи, проверьте корректность данных',
      )
    }
  }

  async taskHandler(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    if (updateTaskDto?.status === 'enabled') {
      return await this.start(id, updateTaskDto)
    } else if (updateTaskDto?.status !== 'error') {
      updateTaskDto.error = {
        message: '',
        trace: '',
      }
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

      this.removeCronJob(id)

      const job = new CronJob(cron, () => {
        this.logger.debug(`[start] Task ${id} execute`)
        // ProcessesService.start(processId) // TODO: call task
      })

      this.schedulerRegistry.addCronJob(id, job)
      job.start()

      updateTaskDto.status = 'enabled'
      updateTaskDto.error = {
        activityId: '',
        message: '',
        trace: '',
      }
    } catch (e) {
      updateTaskDto.status = 'error'
      updateTaskDto.error = {
        message: 'Невозможно запустить задачу (некорректная cron строка)',
        trace: e.message,
      }
      this.logger.warn(`[start] ID:${id} - ${e.message}`)
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
          activityId: '',
          message: '',
          trace: '',
        }
      }
    } catch (e) {
      updateTaskDto.status = 'error'
      updateTaskDto.error = {
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
      this.removeCronJob(id)
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

  removeCronJob(id: string): boolean {
    try {
      const job = this.getCronJob(id)
      if (!job) return true
      job.stop()
      this.schedulerRegistry.deleteCronJob(id)
      return true
    } catch (e) {
      return false
    }
  }

  async findById(id: string): Promise<TaskDocument> {
    return this.taskModel.findById(id).exec()
  }

  async findByStatus(status: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ status }).exec()
  }

  async findByTitle(
    title: string,
    projection?: object | string | [string],
  ): Promise<TaskDocument> {
    return this.taskModel.findOne({ title }, projection).exec()
  }
}
