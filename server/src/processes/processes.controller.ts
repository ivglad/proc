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
import { ProcessesService } from './processes.service'
import { CreateProcessDto } from './dto/createProcess.dto'
import { UpdateProcessDto } from './dto/updateProcess.dto'

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post('create')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProcessDto: CreateProcessDto) {
    return this.processesService.create(createProcessDto)
  }

  @Get(':id')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  findById(@Param('id') id: string) {
    return this.processesService.findById(id)
  }

  @Patch(':id')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  update(@Param('id') id: string, @Body() updateProcessDto: UpdateProcessDto) {
    return this.processesService.update(id, updateProcessDto)
  }

  @Delete(':id')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  remove(@Param('id') id: string) {
    return this.processesService.remove(id)
  }
}
