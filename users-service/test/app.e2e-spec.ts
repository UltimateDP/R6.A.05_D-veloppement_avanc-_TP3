import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/domain/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /users with JWT should create user', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'alice@test.com',
        password: 'secret123',
      });

    const token = login.body.access_token;

    const res = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'bob@test.com',
        name: 'Bob',
        password: 'secret123',
        role: 'admin',
      });

    expect(res.status).toBe(201);
  });

  it('POST /auth/login should return JWT', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'alice@test.com',
        password: 'secret123',
      });

    expect(res.status).toBe(201);
    expect(res.body.access_token).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});