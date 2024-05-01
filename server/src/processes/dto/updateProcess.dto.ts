import { PartialType } from '@nestjs/mapped-types'
import { CreateProcessDto } from './createProcess.dto'

export class UpdateProcessDto extends PartialType(CreateProcessDto) {}
