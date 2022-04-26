import * as jwt from 'jsonwebtoken';

import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from '../../constants/errors';
import { BEARER } from '../../constants/etc';

export const validateToken = async (auth: string, roles?: string[]) => {
  const [bearer, token] = auth.split(' ');

  if (bearer !== BEARER) {
    throw new HttpException(ERRORS.invalidToken, HttpStatus.FORBIDDEN);
  }

  try {
    const resp: any = jwt.decode(token);

    if (roles && !roles?.includes(resp.role)) {
      throw new HttpException(ERRORS.invalidRole, HttpStatus.FORBIDDEN);
    }
    if (!resp.expiresIn || Date.now() > resp.expiresIn) {
      throw new HttpException(ERRORS.tokenExpired, HttpStatus.UNAUTHORIZED);
    }

    return resp;
  } catch (error) {
    throw new HttpException(
      `${ERRORS.tokenError}: ${error.message || error.name}`,

      HttpStatus.FORBIDDEN
    );
  }
};
