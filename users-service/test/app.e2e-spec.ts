import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/domain/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) requires a token', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(401);
  });

  it('/auth/login (POST) returns a JWT', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'alice@test.com', password: 'secret123' })
      .expect(201)
      .expect(({ body }) => {
        expect(body.access_token).toEqual(expect.any(String));
      });
  });
});
