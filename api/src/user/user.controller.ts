import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: [UserEntity], isArray: true })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  addUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
