import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserAuthService } from './user-auth.service';

import { USER_AUTH_ROUTES } from './user.constants';

@Controller(USER_AUTH_ROUTES.main)
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() user: CreateUserDto) {
    return this.userAuthService.signUp(user);
  }
}
