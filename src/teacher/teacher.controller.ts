import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { AuthRequest } from '../auth/auth-request.type';
import { TeacherService } from './teacher.service';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
import { CreateGradeDto } from './dto/create-grade.dto';

@Controller('teacher')
@UseGuards(JwtGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('me')
  me(@Req() req: AuthRequest) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    return this.teacherService.getMe(userId);
  }

  @Get('assignments')
  assignments(@Req() req: AuthRequest) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    return this.teacherService.myAssignments(userId);
  }

  @Post('attendance')
  markAttendance(@Req() req: AuthRequest, @Body() dto: MarkAttendanceDto) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    return this.teacherService.markAttendance(userId, dto);
  }

  @Get('attendance')
  attendanceList(
    @Req() req: AuthRequest,
    @Query('scheduleId') scheduleId?: string,
    @Query('date') date?: string,
  ) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    if (!scheduleId) throw new UnauthorizedException('scheduleId is required');
    return this.teacherService.attendanceList(userId, Number(scheduleId), date);
  }

  @Post('grades')
  createGrade(@Req() req: AuthRequest, @Body() dto: CreateGradeDto) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    return this.teacherService.createGrade(userId, dto);
  }

  @Get('grades')
  gradeList(
    @Req() req: AuthRequest,
    @Query('assignmentId') assignmentId?: string,
    @Query('studentUserId') studentUserId?: string,
  ) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    if (!assignmentId)
      throw new UnauthorizedException('assignmentId is required');

    return this.teacherService.gradeList(
      userId,
      Number(assignmentId),
      studentUserId ? Number(studentUserId) : undefined,
    );
  }
}
