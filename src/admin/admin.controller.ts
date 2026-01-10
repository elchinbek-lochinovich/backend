import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { AdminService } from './admin.service';

import { AssignStudentGroupDto } from './dto/assign-student-group.dto';
import { AssignTeacherDepartmentDto } from './dto/assign-teacher-department.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('admin')
@UseGuards(JwtGuard, RolesGuard)
@Roles('RECTOR')
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get('stats')
  stats() {
    return { ok: true, message: 'Hello Rector 👑' };
  }

  @Get('users')
  listUsers() {
    return this.admin.listUsers();
  }

  @Post('users')
  createUser(@Body() body: CreateUserDto) {
    return this.admin.createUser(body);
  }

  @Post('backfill-profiles')
  backfillProfiles() {
    return this.admin.backfillProfiles();
  }

  @Patch('students/:userId/group')
  assignStudentGroup(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: AssignStudentGroupDto,
  ) {
    return this.admin.assignStudentToGroup(userId, dto.groupId);
  }

  @Patch('teachers/:userId/department')
  assignTeacherDepartment(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: AssignTeacherDepartmentDto,
  ) {
    return this.admin.assignTeacherToDepartment(userId, dto.departmentId);
  }
}
