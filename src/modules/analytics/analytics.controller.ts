import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsSnapshotService } from './analytics-snapshot.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard, Roles } from 'src/auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly snapshots: AnalyticsSnapshotService,
  ) {}

  @Roles('TEACHER', 'RECTOR')
  @Post('snapshots/run-daily')
  async runDailySnapshot() {
    return this.snapshots.computeDailyInstituteSnapshot(new Date());
  }

  @Roles('TEACHER', 'RECTOR')
  @Get('snapshots/latest')
  async latestSnapshot() {
    return this.snapshots.getLatestInstituteSnapshot();
  }

  @Roles('TEACHER', 'RECTOR')
  @Post('student')
  async calcStudentAnalytics(
    @Body('studentUserId', ParseIntPipe) studentUserId: number,
    @Body('fromDate') fromDate: string,
    @Body('toDate') toDate: string,
  ) {
    const from = new Date(fromDate + 'T00:00:00.000Z');
    const to = new Date(toDate + 'T23:59:59.999Z');

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      throw new BadRequestException('Invalid date');
    }

    return this.analyticsService.calcAndSave(studentUserId, from, to);
  }
}
