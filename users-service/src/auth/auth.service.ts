import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../application/app.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = this.appService.findByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}