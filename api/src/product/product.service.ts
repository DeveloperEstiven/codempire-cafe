import { Brackets, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from 'src/menu/entities/menu.entity';
import { FilterDto } from '../dto/filter.dto';
import { PageMetaDto } from '../dto/page-meta.dto';
import { PageDto } from '../dto/page.dto';
import { IngredientEntity } from '../ingredient/entities/ingredient.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { PRODUCT_ERRORS } from './product.constants';

@Injectable()
export class ProductService {
  @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>;
  @InjectRepository(IngredientEntity) private readonly ingredientRepository: Repository<IngredientEntity>;
  @InjectRepository(MenuEntity) private readonly menuRepository: Repository<MenuEntity>;

  async addProduct(createProductDto: CreateProductDto) {
    const ingredients = await this.ingredientRepository.findByIds(createProductDto.ingredientIds);

    const productByName = await this.productRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name: createProductDto.name })
      .getOne();

    if (productByName) {
      throw new HttpException(PRODUCT_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    return this.productRepository.save({ ...createProductDto, ingredients });
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ id: updateProductDto.id });
    if (!product) {
      throw new HttpException(PRODUCT_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }

    const productByName = await this.productRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name: updateProductDto.name })
      .getOne();

    if (productByName && productByName.id !== product.id) {
      throw new HttpException(PRODUCT_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }

    const ingredients = await this.ingredientRepository.findByIds(updateProductDto.ingredientIds);

    const updatedProduct = {
      ...product,
      ...updateProductDto,
      ingredients,
    };
    return this.productRepository.save(updatedProduct);
  }

  async getProductByIdOrFail(id: string, relations?: string[]) {
    const product = await this.productRepository.findOne({ where: { id }, relations });
    if (!product) {
      throw new HttpException(PRODUCT_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async checkProductContains(id: string, checkExists = true) {
    checkExists && (await this.getProductByIdOrFail(id));

    const menus = await this.menuRepository.find({ relations: ['products'] });
    const menusWithProduct: MenuEntity[] = [];
    menus.forEach((menu) => {
      const x = menu.products?.filter((product) => product.id === id);
      x.length && menusWithProduct.push(menu);
    });

    return menusWithProduct;
  }

  async removeProduct(id: string) {
    await this.getProductByIdOrFail(id);

    const menusWithProduct = await this.checkProductContains(id, false);
    const emptyMenusWithProductIds = menusWithProduct
      .filter((menu) => menu.products.length === 1)
      .map((menu) => menu.id);

    emptyMenusWithProductIds.length && (await this.menuRepository.delete(emptyMenusWithProductIds));
    await this.productRepository.delete({ id });

    return { id };
  }

  async getProducts(filter: FilterDto) {
    const { term, field, order, subcategories, limit, page, skip } = filter;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where(
        new Brackets((qb) => {
          qb.where('LOWER(product.name) like LOWER(:name)', { name: `%${term}%` }).orWhere(
            'LOWER(product.description) like LOWER(:description)',
            { description: `%${term}%` }
          );
        })
      )
      .leftJoinAndSelect('product.ingredients', 'ingredient')
      .skip(skip)
      .take(limit);

    if (subcategories.length && subcategories[0] !== '') {
      queryBuilder.andWhere('product.subcategory IN (:...subcategories)', { subcategories });
    }

    if (field && order && field !== 'default') {
      queryBuilder.orderBy(`product.${field}`, order);
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: { limit, page, skip } });
    return new PageDto(entities, pageMetaDto);
  }

  async getProductCategories() {
    const raw = await this.productRepository.find({ select: ['category', 'subcategory'] });
    const categories = raw.reduce((acc, curr) => {
      if (!acc[curr.category]?.length) {
        acc[curr.category] = [];
      }
      acc[curr.category] = [...acc[curr.category], curr.subcategory];
      return acc;
    }, {});

    for (const key in categories) {
      categories[key] = [...new Set(categories[key])];
    }

    return categories;
  }
}
