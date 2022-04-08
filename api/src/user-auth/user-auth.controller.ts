import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWithTokenResponseDto } from 'src/dto/user-with-token.dto';
import { ERRORS } from '../constants/errors';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAuthService } from './user-auth.service';

import { USER_AUTH_ROUTES } from './user.constants';

@ApiTags(USER_AUTH_ROUTES.main)
@Controller(USER_AUTH_ROUTES.main)
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post(USER_AUTH_ROUTES.signUp)
  @ApiOperation({ summary: USER_AUTH_ROUTES.signUp })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_AUTH_ROUTES.signUp,
    type: UserWithTokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ERRORS.alreadyExist,
  })
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() user: CreateUserDto) {
    return this.userAuthService.signUp(user);
  }

  @Post(USER_AUTH_ROUTES.logIn)
  @ApiOperation({ summary: USER_AUTH_ROUTES.logIn })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_AUTH_ROUTES.logIn,
    type: UserWithTokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ERRORS.userNotFound,
  })
  @HttpCode(HttpStatus.CREATED)
  logIn(@Body() user: AuthUserDto) {
    return this.userAuthService.logIn(user);
  }

  @Post(USER_AUTH_ROUTES.logOut)
  @ApiOperation({ summary: USER_AUTH_ROUTES.logOut })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_AUTH_ROUTES.logOut,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @HttpCode(HttpStatus.CREATED)
  logOut(@Body() body: { id: string }) {
    if (body.id) {
      return this.userAuthService.logOut(body.id);
    }
    return;
  }
}
