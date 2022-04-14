import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';

import { MENU_ERRORS } from './menu.constants';

@Injectable()
export class MenuService {
  @InjectRepository(MenuEntity) private readonly menuRepository: Repository<MenuEntity>;

  async addMenu(createMenuDto: CreateMenuDto) {
    const { name } = createMenuDto;
    const menu = await this.menuRepository.findOne({ name });
    if (menu) {
      throw new HttpException(MENU_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    return this.menuRepository.save(createMenuDto);
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.findOne({ id });
    if (!menu) {
      throw new HttpException(MENU_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    const updatedMenu = {
      ...menu,
      ...updateMenuDto,
    };
    return this.menuRepository.save(updatedMenu);
  }

  async removeMenu(id: string) {
    const menu = await this.menuRepository.findOne({ id });
    if (!menu) {
      throw new HttpException(MENU_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    await this.menuRepository.delete({ id });
    return {
      message: 'success',
    };
  }
}
