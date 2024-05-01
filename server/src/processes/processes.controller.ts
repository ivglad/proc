import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ProcessesService } from './processes.service'
import { CreateProcessDto } from './dto/createProcess.dto'
import { UpdateProcessDto } from './dto/updateProcess.dto'

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  create(@Body() createProcessDto: CreateProcessDto) {
    return this.processesService.create(createProcessDto)
  }
}
