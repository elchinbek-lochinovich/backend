import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Analytics (e2e)', () => {
  let app: INestApplication;

  const STUDENT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJTVFVERU5UIiwiaWF0IjoxNzY2OTI1MzA1LCJleHAiOjE3NjcwMTE3MDV9.WdA6m8T9SId2rgViRRzWaWgA62X5qJeIT304stVG4X8';
  const TEACHER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInJvbGUiOiJURUFDSEVSIiwiaWF0IjoxNzY2OTI1MjU3LCJleHAiOjE3NjcwMTE2NTd9.BNZdxPrZKPnrBw7jq0GdOZ7tqerVNmUObAeSm56Gc8Y';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('student cannot access group analytics', async () => {
    await request(app.getHttpServer())
      .get('/analytics/group?groupId=1')
      .set('Authorization', `Bearer ${STUDENT_TOKEN}`)
      .expect(403);
  });

  it('teacher can calculate student analytics and gets meta', async () => {
    const res = await request(app.getHttpServer())
      .post('/analytics/student')
      .set('Authorization', `Bearer ${TEACHER_TOKEN}`)
      .send({
        studentUserId: 3,
        fromDate: '2025-12-01',
        toDate: '2025-12-31',
      })
      .expect(201);

    expect(res.body).toHaveProperty('meta');
    expect(res.body.meta).toHaveProperty('studentUserId', 3);
    expect(res.body.meta).toHaveProperty('clampedToToday');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('riskScore');
  });

    it('student trend ignores studentUserId query and returns self', async () => {
    const res = await request(app.getHttpServer())
      .get('/analytics/student/trend?studentUserId=999&weeks=8')
      .set('Authorization', `Bearer ${STUDENT_TOKEN}`)
      .expect(200);

    expect(res.body).toHaveProperty('meta');
    expect(res.body.meta).toHaveProperty('studentUserId');
    // bu yerda studentUserId 3 bo'lishi kerak (sizning test student tokeningizga mos)
    expect(res.body.meta.studentUserId).toBe(3);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
