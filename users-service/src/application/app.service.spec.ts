import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should create a user', () => {
    const user = service.createUser({
      email: 'test@test.com',
      name: 'Test',
      password: 'secret123',
      role: 'admin',
    });

    expect(user.email).toBe('test@test.com');
  });

  it('should find a user by id', () => {
    const user = service.findUser({ id: 1 });

    expect(user.id).toBe(1);
  });

  it('should throw if user does not exist', () => {
    expect(() => service.findUser({ id: 999 })).toThrow();
  });
});