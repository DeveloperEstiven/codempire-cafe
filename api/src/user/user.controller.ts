import { Body, Controller, HttpCode, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user';
import JwtAuthenticationGuard from 'src/guards/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { USER_ERRORS, USER_ROUTES } from './user.constants';
import { UserService } from './user.service';

@ApiTags(USER_ROUTES.main)
@Controller(USER_ROUTES.main)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(USER_ROUTES.updateUser)
  @ApiOperation({ summary: USER_ROUTES.updateUser })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.updateUser,
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: USER_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  updateUser(@Body() updateUserDto: UpdateUserDto, @User('id') userTokenId: string) {
    return this.userService.updateUser(updateUserDto, userTokenId);
  }

  @Put(USER_ROUTES.changePassword)
  @ApiOperation({ summary: USER_ROUTES.changePassword })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER_ROUTES.changePassword,
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: USER_ERRORS.notFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: `${USER_ERRORS.invalidOldPassword}`,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  changePassword(@Body() body: ChangePasswordDto, @User('id') userTokenId: string) {
    return this.userService.changePassword(body, userTokenId);
  }
}
