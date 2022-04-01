import {
    CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable
} from '@nestjs/common';
import { ERRORS } from 'src/constants/errors';
import { validateToken } from 'src/shared/utils/validate-token';

import { USER_ROLES } from '../user/user.constants';

type TRoles = keyof typeof USER_ROLES;

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private roles: TRoles[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new HttpException(ERRORS.invalidRole, HttpStatus.FORBIDDEN);
    }
    await validateToken(request.headers.authorization, this.roles);
    return true;
  }
}
