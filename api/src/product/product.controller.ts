import { Repository } from 'typeorm';

import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageSuccessDto } from '../dto/message-success.dto';
import { RoleGuard } from '../guards/role.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

import { USER_ROLES } from '../user/user.constants';
import { PRODUCT_ERRORS, PRODUCT_ROUTES } from './product.constants';

@ApiTags(PRODUCT_ROUTES.main)
@Controller(PRODUCT_ROUTES.main)
export class ProductController {
  @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>;
  constructor(private readonly productService: ProductService) {}

  @Post(PRODUCT_ROUTES.addProduct)
  @ApiOperation({ summary: PRODUCT_ROUTES.addProduct })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PRODUCT_ROUTES.addProduct,
    type: ProductEntity,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: PRODUCT_ERRORS.alreadyExist,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(new RoleGuard([USER_ROLES.manager]))
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.addProduct(createProductDto);
  }

  @Put(PRODUCT_ROUTES.updateProduct + '/:id')
  @ApiOperation({ summary: PRODUCT_ROUTES.updateProduct })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT_ROUTES.updateProduct,
    type: ProductEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PRODUCT_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard([USER_ROLES.manager]))
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(PRODUCT_ROUTES.removeProduct + '/:id')
  @ApiOperation({ summary: PRODUCT_ROUTES.removeProduct })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT_ROUTES.removeProduct,
    type: MessageSuccessDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PRODUCT_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(new RoleGuard([USER_ROLES.manager]))
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }

  @Get(PRODUCT_ROUTES.getAllProducts)
  @ApiOperation({ summary: PRODUCT_ROUTES.getAllProducts })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT_ROUTES.getAllProducts,
    type: [ProductEntity],
  })
  @HttpCode(HttpStatus.OK)
  async getAllProducts() {
    return await this.productRepository.find();
  }
}
