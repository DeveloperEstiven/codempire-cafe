import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/guards/auth.guard';
import { FilterDto } from '../dto/filter.dto';
import { MessageSuccessDto } from '../dto/message-success.dto';
import { RoleGuard } from '../guards/role.guard';
import { USER_ROLES } from '../user/user.constants';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { MENU_ERRORS, MENU_ROUTES } from './menu.constants';
import { MenuService } from './menu.service';

@ApiTags(MENU_ROUTES.main)
@Controller(MENU_ROUTES.main)
export class MenuController {
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
  @UseGuards(JwtAuthenticationGuard, new RoleGuard([USER_ROLES.manager]))
  addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.addMenu(createMenuDto);
  }

  @Put(MENU_ROUTES.updateMenu)
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
  @UseGuards(JwtAuthenticationGuard, new RoleGuard([USER_ROLES.manager]))
  updateMenu(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(updateMenuDto);
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
  @UseGuards(JwtAuthenticationGuard, new RoleGuard([USER_ROLES.manager]))
  removeMenu(@Param('id') menuId: string) {
    return this.menuService.removeMenu(menuId);
  }

  @Get(MENU_ROUTES.getMenus)
  @ApiOperation({ summary: MENU_ROUTES.getMenus })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENU_ROUTES.getMenus,
    type: [MenuEntity],
  })
  @HttpCode(HttpStatus.OK)
  async getMenus(@Query() filter: FilterDto) {
    return this.menuService.getMenus(filter);
  }

  @Get(MENU_ROUTES.getMenu + '/:id')
  @ApiOperation({ summary: MENU_ROUTES.getMenu })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENU_ROUTES.getMenu,
    type: MenuEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: MENU_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  async getMenu(@Param('id') id: string) {
    return this.menuService.getMenuByIdOrFail(id, ['products']);
  }
}
