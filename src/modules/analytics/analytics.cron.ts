import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AnalyticsService } from './analytics.service';

@Injectable()
export class AnalyticsCronService {
  private readonly logger = new Logger(AnalyticsCronService.name);

  constructor(private analytics: AnalyticsService) {}

  // Har kuni 02:00 da (server time bo‘yicha)
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async recomputeDaily() {
    this.logger.log('Daily analytics cron started');

    try {
      // Sizning servisingizda qanday method bo‘lsa shuni chaqiramiz:
      // 1) barcha aktiv guruhlar uchun
      // 2) cache stale bo‘lsa generate
      await this.analytics.recomputeAllGroupsIfStale?.();

      this.logger.log('Daily analytics cron finished');
    } catch (e: any) {
      this.logger.error(`Daily analytics cron failed: ${e?.message ?? e}`);
    }
  }
}
