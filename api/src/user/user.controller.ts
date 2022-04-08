import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { USER_ROUTES } from './user.constants';

@ApiTags(USER_ROUTES.main)
@Controller(USER_ROUTES.main)
export class UserController {
  constructor(private readonly userService: UserService) {}
}
