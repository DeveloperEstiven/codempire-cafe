import { Brackets, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from '../dto/filter.dto';
import { PageMetaDto } from '../dto/page-meta.dto';
import { PageOptionsDto } from '../dto/page-options.dto';
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

    if (productByName) {
      throw new HttpException(PRODUCT_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    const updatedProduct = {
      ...product,
      ...updateProductDto,
    };
    return this.productRepository.save(updatedProduct);
  }

  async removeProduct(id: string) {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new HttpException(PRODUCT_ERRORS.notFound, HttpStatus.NOT_FOUND);
    }
    await this.productRepository.delete({ id });
    return {
      message: 'success',
    };
  }

  async getProducts(pageOptionsDto: PageOptionsDto, filter: FilterDto) {
    const { term, sort } = filter;
    const subcategories = filter.subcategories.map((sub) => sub.toLowerCase());

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
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    if (subcategories.length) {
      queryBuilder.andWhere('product.subcategory IN (:...subcategories)', { subcategories });
    }

    if (sort?.field && sort?.order && sort.field !== 'default') {
      queryBuilder.orderBy(`product.${sort.field}`, sort.order);
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
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
