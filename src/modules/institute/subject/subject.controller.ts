import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard, Roles } from 'src/auth/roles.guard';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectService } from './subject.service';

@Controller('subjects')
@UseGuards(JwtGuard, RolesGuard)
@Roles('RECTOR')
export class SubjectController {
  constructor(private readonly service: SubjectService) {}

  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('q') q?: string) {
    return this.service.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSubjectDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
