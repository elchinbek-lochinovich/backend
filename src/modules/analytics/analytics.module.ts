import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AiModule } from '../ai/ai.module';
import { AnalyticsCronService } from './analytics-cron.service';
import { AnalyticsSnapshotService } from './analytics-snapshot.service';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsSnapshotService, AnalyticsCronService],
})
export class AnalyticsModule {}
