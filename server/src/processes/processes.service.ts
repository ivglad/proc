import { Injectable, Logger } from '@nestjs/common'
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
    const createdProcess = new this.processModel(createProcessDto)
    return createdProcess.save()
  }
}
