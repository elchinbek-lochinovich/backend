import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { FacultyController } from './faculty/faculty.controller';
import { FacultyService } from './faculty/faculty.service';

import { DepartmentController } from './department/department.controller';
import { DepartmentService } from './department/department.service';

import { GroupController } from './group/group.controller';
import { GroupService } from './group/group.service';

import { SubjectController } from './subject/subject.controller';
import { SubjectService } from './subject/subject.service';

import { AssignmentController } from './assignment/assignment.controller';
import { AssignmentService } from './assignment/assignment.service';

import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    FacultyController,
    DepartmentController,
    GroupController,
    SubjectController,
    AssignmentController,
    ScheduleController,
  ],
  providers: [
    FacultyService,
    DepartmentService,
    GroupService,
    SubjectService,
    AssignmentService,
    ScheduleService,
  ],
})
export class InstituteModule {}
