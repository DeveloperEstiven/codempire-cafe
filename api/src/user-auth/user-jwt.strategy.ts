import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ERRORS } from 'src/constants/errors';
import { UserService } from '../user/user.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: async (request: Request, rawJwtToken: string, done: (err: any, secret: string) => void) => {
        const decodedToken: { id: string } = jwt.decode(rawJwtToken) as { id: string };

        const user = await this.userService.getUserByColumnOrFail({ id: decodedToken.id });
        const JWT_SECRET = configService.get('JWT_SECRET');
        done(null, `${JWT_SECRET}${user?.publicKey}`);
      },
    });
  }
  async validate(payload: any) {
    if (!payload || !payload.expiresIn || Date.now() > payload.expiresIn) {
      throw new HttpException(ERRORS.tokenExpired, HttpStatus.UNAUTHORIZED);
    }
    return this.userService.getUserByColumnOrFail({ id: payload.id });
  }
}
