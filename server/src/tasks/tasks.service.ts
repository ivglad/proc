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
    this.tasksInitHandler()
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
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec()
    const task = this.taskHandler(updatedTask)
    this.logger.debug(`update`, task)
    return this.taskModel.findByIdAndUpdate(id, task).exec()
  }

  async remove(id: string): Promise<TaskDocument> {
    const removeTaskStatus = this.removeTask(id)
    if (!removeTaskStatus) {
      this.logger.error(
        `remove. ${id}: Remove task status - ${removeTaskStatus}`,
      )
    }
    return this.taskModel.findByIdAndDelete(id).exec()
  }

  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec()
  }

  async findById(id: string): Promise<TaskDocument> {
    return this.taskModel.findById(id)
  }

  async findByStatus(searchStatus: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ status: searchStatus }).exec()
  }

  async tasksInitHandler() {
    const tasks = await this.findByStatus('enabled')
    tasks.forEach((task) => {
      this.startTask(task)
    })
  }

  taskHandler(task: TaskDocument): TaskDocument {
    if (task.status === 'enabled') {
      return this.startTask(task)
    } else if (task.status === 'disabled') {
      return this.stopTask(task)
    }
    return task
  }

  startTask(task: TaskDocument): TaskDocument {
    const taskId = task._id.toString()
    try {
      const job = new CronJob(task.schedule.cron, () => {
        this.logger.debug(`Task execute. ${taskId}`)
      })

      this.schedulerRegistry.addCronJob(taskId, job)
      job.start()

      task.error.message = ''
    } catch (e) {
      this.logger.error(`startTask. ${taskId}: ${e.message}`)
      task.status = 'error'
      task.error.message = e.message
    } finally {
      return task
    }
  }

  stopTask(task: TaskDocument): TaskDocument {
    const taskId = task._id.toString()
    try {
      const jobs = this.schedulerRegistry.getCronJobs()
      jobs.forEach((value, key, map) => {
        if (key !== taskId) return
        this.schedulerRegistry.deleteCronJob(taskId)
      })

      task.status = 'disabled'
      task.error.message = ''
    } catch (e) {
      this.logger.error(`stopTask. ${taskId}: ${e.message}`)
      task.status = 'error'
      task.error.message = e.message
    } finally {
      return task
    }
  }

  removeTask(taskId: string): boolean {
    let status = true
    try {
      const jobs = this.schedulerRegistry.getCronJobs()
      jobs.forEach((value, key, map) => {
        if (key !== taskId) return
        this.schedulerRegistry.deleteCronJob(taskId)
      })
    } catch (e) {
      this.logger.error(`removeTask. ${taskId}: ${e.message}`)
      status = false
    } finally {
      return status
    }
  }
}
