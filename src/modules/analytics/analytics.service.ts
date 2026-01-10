import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AttendanceStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private prisma: PrismaService, private ai: AiService) {}

  private clamp01(x: number) {
    return Math.max(0, Math.min(1, x));
  }

  private startOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  private endOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  }

  /**
   * Group AI Summary uchun barqaror cache window:
   * - toDate: bugun 23:59:59.999
   * - fromDate: 14 kun oldin 00:00:00.000
   */
  private groupWindow(days = 14) {
    const toDate = this.endOfDay(new Date());
    const fromDate = this.startOfDay(new Date(toDate));
    fromDate.setDate(fromDate.getDate() - (days - 1)); // 14 kun inclusive window
    return { fromDate, toDate };
  }

  /**
   * Student latest analytics uchun default window:
   * - toDate: bugun 23:59:59.999
   * - fromDate: 30 kun oldin 00:00:00.000
   */
  private studentDefaultWindow(days = 30) {
    const toDate = this.endOfDay(new Date());
    const fromDate = this.startOfDay(new Date(toDate));
    fromDate.setDate(fromDate.getDate() - (days - 1));
    return { fromDate, toDate };
  }

  async calcStudent(studentUserId: number, fromDate: Date, toDate: Date) {
    const student = await this.prisma.studentProfile.findUnique({
      where: { userId: studentUserId },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    const attendances = await this.prisma.attendance.findMany({
      where: {
        studentUserId,
        date: { gte: fromDate, lte: toDate },
      },
    });

    const total = attendances.length;
    const present = attendances.filter(
      (a) => a.status === AttendanceStatus.PRESENT,
    ).length;
    const late = attendances.filter((a) => a.status === AttendanceStatus.LATE)
      .length;
    const excused = attendances.filter(
      (a) => a.status === AttendanceStatus.EXCUSED,
    ).length;

    const attendanceRate =
      total === 0 ? 1 : (present + 0.7 * late + 0.8 * excused) / total;

    const grades = await this.prisma.grade.findMany({
      where: { studentUserId, createdAt: { gte: fromDate, lte: toDate } },
      orderBy: { createdAt: 'asc' },
    });

    const avgScore =
      grades.length === 0
        ? null
        : grades.reduce(
            (sum, g) =>
              sum + (g.maxScore ? (g.score / g.maxScore) * 100 : g.score),
            0,
          ) / grades.length;

    const lastScore =
      grades.length === 0
        ? null
        : grades[grades.length - 1].maxScore
          ? (grades[grades.length - 1].score /
              grades[grades.length - 1].maxScore) *
            100
          : grades[grades.length - 1].score;

    const deltaFromAvg =
      avgScore == null || lastScore == null
        ? null
        : Number((lastScore - avgScore).toFixed(1));

    const attendanceRisk = 1 - this.clamp01(attendanceRate);
    const gradeRisk = avgScore == null ? 0.25 : 1 - this.clamp01(avgScore / 100);
    const riskScore = Number(
      this.clamp01(0.6 * attendanceRisk + 0.4 * gradeRisk).toFixed(2),
    );

    const insights: any = {
      version: 1,
      summary: {
        totalLessons: total,
        attendanceRate,
        avgScore,
        riskScore,
      },
      signals: {
        attendance: {
          total,
          present,
          late,
          excused,
          attendanceRate,
        },
        grades: {
          count: grades.length,
          avgScore,
          lastScore: lastScore == null ? null : Number(lastScore.toFixed(1)),
          deltaFromAvg,
        },
        risk: {
          attendanceRisk: Number(attendanceRisk.toFixed(2)),
          gradeRisk: Number(gradeRisk.toFixed(2)),
          riskScore,
        },
      },
      flags: [],
      tips: [],
    };

    if (riskScore <= 0.3 && (avgScore ?? 0) >= 75 && attendanceRate >= 0.85) {
      insights.flags.push('GOOD_PROGRESS');
      insights.tips.push(
        "Ijobiy holat: shu tempni saqlang, haftalik qisqa takrorlashlar qiling.",
      );
    }

    if (riskScore >= 0.6) {
      insights.flags.push('NEEDS_ATTENTION');
      insights.tips.push(
        "E'tibor kerak: davomat va baholarni yaxshilash uchun 2 haftalik reja tuzing.",
      );
    }

    if (total >= 3 && attendanceRate < 0.8) {
      insights.flags.push('LOW_ATTENDANCE');
      insights.tips.push(
        "Davomatni oshirish: darsga kechikish/kelmaslik sababini aniqlang va reja qiling.",
      );
    }

    if (avgScore != null && avgScore < 60) {
      insights.flags.push('LOW_GRADES');
      insights.tips.push(
        "Bahoni oshirish: haftalik 3 ta mini test + uy vazifa nazorati.",
      );
    }

    if (riskScore > 0.7) {
      insights.flags.push('HIGH_RISK');
      insights.tips.push(
        "Yuqori risk: mentor/kurator bilan 1:1 suhbat va 2 haftalik reja tuzing.",
      );
    }

    return { attendanceRate, avgScore, riskScore, insights };
  }

  async calcAndSave(studentUserId: number, fromDate: Date, toDate: Date) {
    const result = await this.calcStudent(studentUserId, fromDate, toDate);

    return this.prisma.studentAnalytics.upsert({
      where: {
        studentUserId_fromDate_toDate: { studentUserId, fromDate, toDate },
      },
      update: {
        attendanceRate: result.attendanceRate,
        avgScore: result.avgScore,
        riskScore: result.riskScore,
        insights: result.insights,
      },
      create: {
        studentUserId,
        fromDate,
        toDate,
        attendanceRate: result.attendanceRate,
        avgScore: result.avgScore,
        riskScore: result.riskScore,
        insights: result.insights,
      },
    });
  }

  // ✅ Auto-recalc: agar analyticsdan keyin attendance/grade qo‘shilsa qayta hisoblaydi
  async getLatestForStudent(studentUserId: number) {
    const student = await this.prisma.studentProfile.findUnique({
      where: { userId: studentUserId },
      select: { userId: true },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    const { toDate: todayEnd } = this.studentDefaultWindow(30);

    const latest = await this.prisma.studentAnalytics.findFirst({
      where: {
        studentUserId,
        toDate: { lte: todayEnd },
      },
      orderBy: [{ toDate: 'desc' }, { createdAt: 'desc' }],
    });

    if (!latest) {
      const { fromDate, toDate } = this.studentDefaultWindow(30);
      return this.calcAndSave(studentUserId, fromDate, toDate);
    }

    const newerAttendance = await this.prisma.attendance.findFirst({
      where: {
        studentUserId,
        createdAt: { gt: latest.createdAt },
      },
      select: { id: true },
    });

    const newerGrade = await this.prisma.grade.findFirst({
      where: {
        studentUserId,
        createdAt: { gt: latest.createdAt },
      },
      select: { id: true },
    });

    if (newerAttendance || newerGrade) {
      return this.calcAndSave(studentUserId, latest.fromDate, todayEnd);
    }

    return latest;
  }

  async getStudentWeeklyTrend(studentUserId: number, weeks: number) {
    const student = await this.prisma.studentProfile.findUnique({
      where: { userId: studentUserId },
      select: { userId: true },
    });
    if (!student) throw new NotFoundException('Student profile not found');

    const todayEnd = this.endOfDay(new Date());
    const from = new Date(todayEnd);
    from.setDate(from.getDate() - weeks * 7);

    const records = await this.prisma.studentAnalytics.findMany({
      where: {
        studentUserId,
        toDate: { lte: todayEnd },
        fromDate: { gte: from },
      },
      orderBy: [{ fromDate: 'asc' }, { toDate: 'asc' }, { createdAt: 'asc' }],
    });

    const byFromDate = new Map<string, (typeof records)[number]>();
    for (const r of records) {
      const key = r.fromDate.toISOString();
      const prev = byFromDate.get(key);
      if (!prev) byFromDate.set(key, r);
      else {
        const better =
          r.toDate > prev.toDate
            ? r
            : r.toDate < prev.toDate
              ? prev
              : r.createdAt > prev.createdAt
                ? r
                : prev;
        byFromDate.set(key, better);
      }
    }

    const uniq = Array.from(byFromDate.values()).sort(
      (a, b) => a.fromDate.getTime() - b.fromDate.getTime(),
    );

    return {
      meta: {
        studentUserId,
        weeks,
        fromDate: from.toISOString(),
        toDate: todayEnd.toISOString(),
      },
      data: uniq.map((r) => ({
        id: r.id,
        fromDate: r.fromDate,
        toDate: r.toDate,
        attendanceRate: Number(r.attendanceRate.toFixed(2)),
        avgScore: r.avgScore == null ? null : Number(r.avgScore.toFixed(1)),
        riskScore: Number(r.riskScore.toFixed(2)),
        riskBand:
          r.riskScore >= 0.7 ? 'HIGH' : r.riskScore >= 0.3 ? 'MEDIUM' : 'LOW',
        flags: Array.from(
          new Set((((r.insights as any)?.flags ?? []) as string[])),
        ),
      })),
    };
  }

  // ✅ promptga real data qo‘shildi + AI natija DB’ga saqlandi (StudentAnalytics.insights.ai)
  async buildStudentPromptPayload(
    studentUserId: number,
    weeks: number,
    requesterRole: string,
  ) {
    const latest = await this.getLatestForStudent(studentUserId);
    const trend = await this.getStudentWeeklyTrend(studentUserId, weeks);

    const latestInsights = (latest.insights as any) ?? {};
    const summary =
      latestInsights.summary ?? {
        attendanceRate: latest.attendanceRate,
        avgScore: latest.avgScore,
        riskScore: latest.riskScore,
      };

    const safeLatest = {
      fromDate: latest.fromDate,
      toDate: latest.toDate,
      attendanceRate: Number(latest.attendanceRate.toFixed(2)),
      avgScore:
        latest.avgScore == null ? null : Number(latest.avgScore.toFixed(1)),
      riskScore: Number(latest.riskScore.toFixed(2)),
      riskBand:
        latest.riskScore >= 0.7
          ? 'HIGH'
          : latest.riskScore >= 0.3
            ? 'MEDIUM'
            : 'LOW',
      flags: Array.from(
        new Set((((latest.insights as any)?.flags ?? []) as string[])),
      ),
      summary,
      signals: latestInsights.signals ?? null,
    };

    const prompt = [
      'You are an academic advisor assistant.',
      'Use ONLY the provided analytics data. Do not invent facts.',
      'Return ONLY valid JSON (no markdown, no extra text).',
      '',
      `Context: requesterRole=${requesterRole}`,
      `StudentUserId: ${studentUserId}`,
      '',
      'ANALYTICS_JSON:',
      JSON.stringify({ latest: safeLatest, trend: trend.data }),
      '',
      'Task:',
      '1) Provide 3 short insights based on the data.',
      '2) Provide 3 actionable recommendations for the next 2 weeks.',
      '3) risk_note MUST match riskBand/riskScore; do NOT escalate if riskBand is LOW.',
      '',
      'Return JSON with keys: insights[], recommendations[], risk_note (string).',
    ].join('\n');

    let ai: any = (latest.insights as any)?.ai ?? null;

    if (!ai) {
      try {
        this.logger.log(`[AI] Student cache MISS: calling OpenAI (student=${studentUserId})`);
        ai = await this.ai.runPrompt(prompt);

        if (ai && latest?.id) {
          await this.prisma.studentAnalytics.update({
            where: { id: latest.id },
            data: {
              insights: {
                ...(latest.insights as any),
                ai,
              },
            },
          });
        }
      } catch (e: any) {
        this.logger.warn(`[AI] Student prompt failed (student=${studentUserId}): ${e?.message ?? e}`);
        ai = null;
      }
    } else {
      this.logger.log(`[AI] Student cache HIT (student=${studentUserId})`);
    }

    return {
      meta: {
        studentUserId,
        weeks,
        requesterRole,
        generatedAt: new Date().toISOString(),
      },
      data: {
        latest: {
          id: latest.id,
          fromDate: latest.fromDate,
          toDate: latest.toDate,
          attendanceRate: Number(latest.attendanceRate.toFixed(2)),
          avgScore:
            latest.avgScore == null
              ? null
              : Number(latest.avgScore.toFixed(1)),
          riskScore: Number(latest.riskScore.toFixed(2)),
          riskBand:
            latest.riskScore >= 0.7
              ? 'HIGH'
              : latest.riskScore >= 0.3
                ? 'MEDIUM'
                : 'LOW',
          flags: safeLatest.flags,
          summary,
          signals: latestInsights.signals ?? null,
        },
        trend: trend.data,
      },
      prompt,
      ai,
    };
  }

  // Controller ishlatadigan method
  async getStudentForPeriod(studentUserId: number, from: Date, to: Date) {
    return this.calcAndSave(studentUserId, from, to);
  }

  // Controller uchun: ARRAY qaytaradi (map/sort/filter ishlashi uchun)
  async getGroupDashboard(groupId: number) {
    const students = await this.prisma.studentProfile.findMany({
      where: { groupId },
      select: { userId: true },
    });

    const data: {
      studentUserId: number;
      latest: {
        attendanceRate: number;
        avgScore: number | null;
        riskScore: number;
        riskBand: 'LOW' | 'MEDIUM' | 'HIGH';
        flags: string[];
      };
    }[] = [];

    for (const s of students) {
      const latest = await this.getLatestForStudent(s.userId);

      data.push({
        studentUserId: s.userId,
        latest: {
          attendanceRate: latest.attendanceRate,
          avgScore: latest.avgScore,
          riskScore: latest.riskScore,
          riskBand:
            latest.riskScore >= 0.7
              ? 'HIGH'
              : latest.riskScore >= 0.3
                ? 'MEDIUM'
                : 'LOW',
          flags: Array.from(
            new Set((((latest.insights as any)?.flags ?? []) as string[])),
          ),
        },
      });
    }

    return data;
  }

  // ✅ Group AI Summary (GroupAiSummary.payload: {prompt, ai}) + cache window fix
  async buildGroupSummaryPayload(groupId: number, requesterRole: string) {
    const rows = await this.getGroupDashboard(groupId);

    const safe = rows.map((x) => ({
      studentUserId: x.studentUserId,
      riskScore: Number(x.latest.riskScore.toFixed(2)),
      riskBand: x.latest.riskBand,
      avgScore: x.latest.avgScore,
      attendanceRate: Number(x.latest.attendanceRate.toFixed(2)),
      flags: x.latest.flags,
    }));

    const { fromDate, toDate } = this.groupWindow(14);

    const existing = await this.prisma.groupAiSummary.findUnique({
      where: { groupId_fromDate_toDate: { groupId, fromDate, toDate } },
    });

    if (existing) {
      const payload = existing.payload as any;
      return {
        meta: {
          groupId,
          requesterRole,
          generatedAt: new Date().toISOString(),
          studentCount: safe.length,
          cached: true,
          fromDate: fromDate.toISOString(),
          toDate: toDate.toISOString(),
        },
        data: { students: safe },
        prompt: payload?.prompt ?? null,
        ai: payload?.ai ?? null,
      };
    }

    const prompt = [
      'You are an academic advisor assistant for a university group dashboard.',
      'Use ONLY the provided JSON data. Do not invent facts.',
      'Return ONLY valid JSON.',
      '',
      `Context: requesterRole=${requesterRole}`,
      `GroupId: ${groupId}`,
      '',
      'GROUP_ANALYTICS_JSON:',
      JSON.stringify({ students: safe }),
      '',
      'Task:',
      '1) Provide 5 concise insights about the group.',
      '2) Provide 5 actionable recommendations for the next 2 weeks.',
      '3) List high_risk_students as array of studentUserId where riskBand is HIGH.',
      '',
      'Return JSON with keys: insights[], recommendations[], high_risk_students[].',
    ].join('\n');

    let ai: any = null;
    try {
      this.logger.log(`[AI] Group cache MISS: calling OpenAI (group=${groupId})`);
      ai = await this.ai.runPrompt(prompt);
    } catch (e: any) {
      this.logger.warn(`[AI] Group prompt failed (group=${groupId}): ${e?.message ?? e}`);
      ai = null;
    }

    if (ai) {
      await this.prisma.groupAiSummary.upsert({
        where: { groupId_fromDate_toDate: { groupId, fromDate, toDate } },
        update: { payload: { prompt, ai } as any },
        create: { groupId, fromDate, toDate, payload: { prompt, ai } as any },
      });
    }

    return {
      meta: {
        groupId,
        requesterRole,
        generatedAt: new Date().toISOString(),
        studentCount: safe.length,
        cached: false,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      },
      data: { students: safe },
      prompt,
      ai,
    };
  }

  /**
   * -------------------------
   * CRON uchun methodlar
   * -------------------------
   */

  // Student latest stale bo‘lsa qayta hisoblash (cron ham chaqiradi)
  async recomputeStudentLatestIfStale(studentUserId: number) {
    // getLatestForStudent ichida stale logic bor (attendance/grade new bo‘lsa calcAndSave qiladi)
    await this.getLatestForStudent(studentUserId);
  }

  // Bitta group summary stale bo‘lsa generatsiya (cron ham chaqiradi)
  async recomputeGroupSummaryIfStale(groupId: number, requesterRole = 'SYSTEM') {
    // buildGroupSummaryPayload cache HIT bo‘lsa DB’dan qaytaradi, MISS bo‘lsa generatsiya qiladi
    await this.buildGroupSummaryPayload(groupId, requesterRole);
  }

  // Barcha group’lar bo‘yicha (cron)
  async recomputeAllGroupsIfStale(requesterRole = 'SYSTEM') {
    const groups = await this.prisma.group.findMany({
      select: { id: true },
    });

    this.logger.log(`[CRON] recomputeAllGroupsIfStale: groups=${groups.length}`);

    for (const g of groups) {
      try {
        // 1) group summary stale bo‘lsa generate
        await this.recomputeGroupSummaryIfStale(g.id, requesterRole);
      } catch (e: any) {
        this.logger.warn(`[CRON] group=${g.id} failed: ${e?.message ?? e}`);
      }
    }

    this.logger.log('[CRON] recomputeAllGroupsIfStale done');
  }
}
