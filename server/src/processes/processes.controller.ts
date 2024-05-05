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
  // @UseGuards(AccessTokenGuard)
  create(@Body() createProcessDto: CreateProcessDto) {
    return this.processesService.create(createProcessDto)
  }

  // @Get(':id')
  // // @UseGuards(AccessTokenGuard)
  // findById(@Param('id') id: string) {
  //   return this.processesService.findById(id)
  // }

  // @Patch(':id')
  // // @UseGuards(AccessTokenGuard)
  // update(@Param('id') id: string, @Body() updateProcessDto: UpdateProcessDto) {
  //   return this.processesService.update(id, updateProcessDto)
  // }

  // @Delete(':id')
  // // @UseGuards(AccessTokenGuard)
  // remove(@Param('id') id: string) {
  //   return this.processesService.remove(id)
  // }
}
