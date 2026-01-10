import {
  Controller,
  Query,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { AuthRequest } from '../auth/auth-request.type';
import { StudentService } from './student.service';

@Controller('student')
@UseGuards(JwtGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('me')
  me(@Req() req: AuthRequest) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');

    // Sening serviceng qanday nomlangan bo'lsa, shu qoladi.
    // Odatda: getMe(userId) yoki me(userId)
    return this.studentService.getMe(userId);
  }
  @Get('assignments')
  assignments(@Req() req: AuthRequest) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    return this.studentService.myAssignments(userId);
  }
  @Get('attendance')
  @UseGuards(JwtGuard)
  attendance(
    @Req() req: AuthRequest,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    return this.studentService.myAttendance(userId, from, to);
  }

  @Get('grades')
  @UseGuards(JwtGuard)
  grades(
    @Req() req: AuthRequest,
    @Query('assignmentId') assignmentId?: string,
  ) {
    const userId = req.user?.sub ?? req.user?.id;
    if (!userId) throw new UnauthorizedException('No user in token');
    return this.studentService.myGrades(
      userId,
      assignmentId ? Number(assignmentId) : undefined,
    );
  }
}
