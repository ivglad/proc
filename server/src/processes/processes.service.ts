import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateProcessDto } from './dto/createProcess.dto'
import { UpdateProcessDto } from './dto/updateProcess.dto'
import { Process, ProcessDocument } from './schemas/process.schema'

@Injectable()
export class ProcessesService {
  private readonly logger = new Logger(ProcessesService.name)
  constructor(
    @InjectModel(Process.name) private processModel: Model<ProcessDocument>,
  ) {}

  async create(createProcessDto: CreateProcessDto): Promise<ProcessDocument> {
    try {
      const processTitleExists = await this.findByTitle(
        createProcessDto.title,
        'title',
      )
      if (processTitleExists) {
        throw new BadRequestException('Процесс с таким именем уже существует')
      }

      const createdProcess = new this.processModel(createProcessDto)
      const result = await createdProcess.save()
      return result
    } catch (e) {
      throw new BadRequestException(
        e.message,
        'Ошибка создания процесса, проверьте корректность данных',
      )
    }
  }

  async update(
    id: string,
    updateProcessDto: UpdateProcessDto,
  ): Promise<ProcessDocument> {
    try {
      const process = await this.processModel
        .findByIdAndUpdate(id, updateProcessDto, {
          new: true,
        })
        .exec()

      return process
    } catch (e) {
      throw new BadRequestException(
        e.message,
        'Ошибка обновления процесса, проверьте корректность данных',
      )
    }
  }

  async remove(id: string): Promise<boolean> {
    let status = true
    try {
      await this.processModel.findByIdAndDelete(id).exec()
    } catch (e) {
      status = false
      this.logger.error(`[remove] ID:${id} - ${e.message}`)
    } finally {
      return status
    }
  }

  async findById(id: string): Promise<ProcessDocument> {
    return this.processModel.findById(id).exec()
  }

  async findByTitle(
    title: string,
    projection?: object | string | [string],
  ): Promise<ProcessDocument> {
    return this.processModel.findOne({ title }, projection).exec()
  }
}
