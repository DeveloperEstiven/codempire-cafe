import { Repository } from 'typeorm';

import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageSuccessDto } from '../dto/message-success.dto';
import { RoleGuard } from '../guards/role.guard';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { MenuService } from './menu.service';

import { USER_ROLES } from '../user/user.constants';
import { MENU_ERRORS, MENU_ROUTES } from './menu.constants';

@ApiTags(MENU_ROUTES.main)
@Controller(MENU_ROUTES.main)
export class MenuController {
  @InjectRepository(MenuEntity) private readonly menuRepository: Repository<MenuEntity>;
  constructor(private readonly menuService: MenuService) {}

  @Post(MENU_ROUTES.addMenu)
  @ApiOperation({ summary: MENU_ROUTES.addMenu })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MENU_ROUTES.addMenu,
    type: MenuEntity,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: MENU_ERRORS.alreadyExist,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(new RoleGuard([USER_ROLES.manager]))
  addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.addMenu(createMenuDto);
  }

  @Put(MENU_ROUTES.updateMenu + '/:id')
  @ApiOperation({ summary: MENU_ROUTES.updateMenu })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENU_ROUTES.updateMenu,
    type: MenuEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MENU_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard([USER_ROLES.manager]))
  updateMenu(@Param('id') menuId: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(menuId, updateMenuDto);
  }

  @Delete(MENU_ROUTES.removeMenu + '/:id')
  @ApiOperation({ summary: MENU_ROUTES.removeMenu })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENU_ROUTES.removeMenu,
    type: MessageSuccessDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MENU_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard([USER_ROLES.manager]))
  removeMenu(@Param('id') menuId: string) {
    return this.menuService.removeMenu(menuId);
  }

  @Get(MENU_ROUTES.getAllMenus)
  @ApiOperation({ summary: MENU_ROUTES.getAllMenus })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENU_ROUTES.getAllMenus,
    type: [MenuEntity],
  })
  @HttpCode(HttpStatus.OK)
  async getAllMenus() {
    return await this.menuRepository.find();
  }
}
