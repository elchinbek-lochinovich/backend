import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';

import { InstituteModule } from './modules/institute/institute.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AiModule } from './modules/ai/ai.module';

import { AppController } from './app.controller';
import { HealthController } from './health.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AnalyticsModule,
    JwtModule.register({
      global: true,
      // Eslatma: sende boshqa secret ishlatilsa (JWT_ACCESS_SECRET), oвЂshanga mosla
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    AdminModule,
    TeacherModule,
    StudentModule,
    InstituteModule,
    AiModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
