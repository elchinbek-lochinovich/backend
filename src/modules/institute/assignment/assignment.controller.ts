import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard, Roles } from 'src/auth/roles.guard';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
@UseGuards(JwtGuard, RolesGuard)
@Roles('RECTOR')
export class AssignmentController {
  constructor(private readonly service: AssignmentService) {}

  @Post()
  create(@Body() dto: CreateAssignmentDto) {
    return this.service.create(dto);
  }

  @Get()
  list(
    @Query('groupId') groupId?: string,
    @Query('teacherUserId') teacherUserId?: string,
    @Query('subjectId') subjectId?: string,
  ) {
    return this.service.list({
      groupId: groupId ? Number(groupId) : undefined,
      teacherUserId: teacherUserId ? Number(teacherUserId) : undefined,
      subjectId: subjectId ? Number(subjectId) : undefined,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
