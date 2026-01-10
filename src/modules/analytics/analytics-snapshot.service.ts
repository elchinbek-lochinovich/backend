import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type SnapshotScope = 'institute' | 'faculty' | 'group' | 'student';

@Injectable()
export class AnalyticsSnapshotService {
  private readonly logger = new Logger(AnalyticsSnapshotService.name);

  constructor(private readonly prisma: PrismaService) {}

  async computeDailyInstituteSnapshot(date = new Date()) {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    const students = await this.prisma.studentProfile.count();
    const teachers = await this.prisma.teacherProfile.count();
    const groups = await this.prisma.group.count();

    const payload = {
      date: day.toISOString(),
      totals: { students, teachers, groups },
    };

    await this.upsertSnapshot('institute', null, day, payload);

    this.logger.log(
      'Daily institute snapshot saved: students=' +
        students +
        ', teachers=' +
        teachers +
        ', groups=' +
        groups,
    );

    return payload;
  }

  async getLatestInstituteSnapshot() {
    const rows = (await this.prisma.$queryRawUnsafe(
      'SELECT payload FROM "AnalyticsSnapshot" WHERE scope = $1 AND "scopeId" IS NULL ORDER BY date DESC LIMIT 1',
      'institute',
    )) as any[];

    return rows && rows[0] ? rows[0].payload : null;
  }

  private async upsertSnapshot(
    scope: SnapshotScope,
    scopeId: number | null,
    date: Date,
    payload: any,
  ) {
    const rows = (await this.prisma.$queryRawUnsafe(
      'SELECT id FROM "AnalyticsSnapshot" WHERE scope = $1 AND "scopeId" IS NOT DISTINCT FROM $2 AND date = $3 LIMIT 1',
      scope,
      scopeId,
      date,
    )) as { id: number }[];

    if (!rows || rows.length === 0) {
      await this.prisma.$executeRawUnsafe(
        'INSERT INTO "AnalyticsSnapshot" (scope, "scopeId", date, payload, "createdAt") VALUES ($1, $2, $3, $4, NOW())',
        scope,
        scopeId,
        date,
        payload,
      );
      return;
    }

    await this.prisma.$executeRawUnsafe(
      'UPDATE "AnalyticsSnapshot" SET payload = $1 WHERE id = $2',
      payload,
      rows[0].id,
    );
  }
}
