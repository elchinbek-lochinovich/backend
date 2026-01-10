import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AnalyticsSnapshotService } from './analytics-snapshot.service';

@Injectable()
export class AnalyticsCronService {
  private readonly logger = new Logger(AnalyticsCronService.name);

  constructor(private readonly snapshots: AnalyticsSnapshotService) {}

  // Har kuni 02:00 (server vaqtida)
  @Cron('0 2 * * *')
  async runDaily() {
    this.logger.log('Running daily analytics snapshot cron...');
    await this.snapshots.computeDailyInstituteSnapshot(new Date());
    this.logger.log('Daily analytics snapshot cron done вњ…');
  }
}
