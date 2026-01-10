import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard, Roles } from 'src/auth/roles.guard';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
@UseGuards(JwtGuard, RolesGuard)
@Roles('RECTOR')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Post()
  create(@Body() dto: CreateScheduleDto) {
    return this.service.create(dto);
  }

  @Get()
  list(
    @Query('groupId') groupId?: string,
    @Query('teacherUserId') teacherUserId?: string,
    @Query('dayOfWeek') dayOfWeek?: string,
  ) {
    return this.service.list({
      groupId: groupId ? Number(groupId) : undefined,
      teacherUserId: teacherUserId ? Number(teacherUserId) : undefined,
      dayOfWeek: dayOfWeek ? Number(dayOfWeek) : undefined,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
