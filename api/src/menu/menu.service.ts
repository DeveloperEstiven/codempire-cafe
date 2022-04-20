import { Brackets, In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from '../dto/filter.dto';
import { PageMetaDto } from '../dto/page-meta.dto';
import { PageOptionsDto } from '../dto/page-options.dto';
import { PageDto } from '../dto/page.dto';
import { ProductEntity } from '../product/entities/product.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { MENU_ERRORS } from './menu.constants';

@Injectable()
export class MenuService {
  @InjectRepository(MenuEntity) private readonly menuRepository: Repository<MenuEntity>;
  @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>;

  async addMenu(createMenuDto: CreateMenuDto) {
    const products = await this.productRepository.findByIds(createMenuDto.productIds);
    const menuByName = await this.menuRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name: createMenuDto.name })
      .getOne();

    if (menuByName) {
      throw new HttpException(MENU_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    return this.menuRepository.save({ ...createMenuDto, products });
  }

  async updateMenu(updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.findOne({ id: updateMenuDto.id });
    if (!menu) {
      throw new HttpException(MENU_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    const menuByName = await this.menuRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name: updateMenuDto.name })
      .getOne();

    if (menuByName) {
      throw new HttpException(MENU_ERRORS.alreadyExist, HttpStatus.CONFLICT);
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

  async getMenus(pageOptionsDto: PageOptionsDto, filter: FilterDto) {
    const { term, sort } = filter;
    const subcategories = filter.subcategories.map((sub) => sub.toLowerCase());
    const menuIds = [];
    if (subcategories.length) {
      const products = await this.productRepository.find({
        where: { subcategory: In(subcategories) },
        relations: ['menus'],
      });
      products.forEach((product) => {
        menuIds.push(...product.menus.map((menu) => menu.id));
      });
    }
    const menuSetIds = [...new Set(menuIds)];

    const queryBuilder = this.menuRepository
      .createQueryBuilder('menu')
      .where(
        new Brackets((qb) => {
          qb.where('LOWER(menu.name) like LOWER(:name)', { name: `%${term}%` }).orWhere(
            'LOWER(menu.description) like LOWER(:description)',
            { description: `%${term}%` }
          );
        })
      )
      .leftJoinAndSelect('menu.products', 'product')
      .leftJoinAndSelect('product.ingredients', 'ingredient')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    if (menuSetIds.length) {
      queryBuilder.andWhere('menu.id IN (:...menuIds)', { menuIds: menuSetIds });
    }

    if (sort?.field && sort?.order && sort?.field !== 'default') {
      queryBuilder.orderBy(`menu.${sort.field}`, sort.order);
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
