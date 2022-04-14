import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

import { PRODUCT_ERRORS } from './product.constants';

@Injectable()
export class ProductService {
  @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>;
  async addProduct(createProductDto: CreateProductDto) {
    const { name } = createProductDto;
    const product = await this.productRepository.findOne({ name });
    if (product) {
      throw new HttpException(PRODUCT_ERRORS.alreadyExist, HttpStatus.CONFLICT);
    }
    return this.productRepository.save(createProductDto);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new HttpException(PRODUCT_ERRORS.notFound, HttpStatus.NOT_FOUND);
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
}
