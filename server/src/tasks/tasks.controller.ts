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
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/createTask.dto'
import { UpdateTaskDto } from './dto/updateTask.dto'
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto)
  }

  @Get(':id')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  findById(@Param('id') id: string) {
    return this.tasksService.findById(id)
  }

  @Patch(':id')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(':id')
  // @UseGuards(AccessTokenGuard) // TODO uncomment
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id)
  }
}
