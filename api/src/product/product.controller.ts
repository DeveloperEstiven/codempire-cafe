import { Repository } from 'typeorm';

import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import JwtAuthenticationGuard from 'src/guards/auth.guard';
import { FilterDto } from '../dto/filter.dto';
import { MessageSuccessDto } from '../dto/message-success.dto';
import { PageOptionsDto } from '../dto/page-options.dto';
import { RoleGuard } from '../guards/role.guard';
import { USER_ROLES } from '../user/user.constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { PRODUCT_ERRORS, PRODUCT_ROUTES } from './product.constants';
import { ProductService } from './product.service';

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
  @UseGuards(JwtAuthenticationGuard, new RoleGuard([USER_ROLES.manager]))
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.addProduct(createProductDto);
  }

  @Put(PRODUCT_ROUTES.updateProduct)
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
  @UseGuards(JwtAuthenticationGuard, new RoleGuard([USER_ROLES.manager]))
  updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(updateProductDto);
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
  @UseGuards(JwtAuthenticationGuard, new RoleGuard([USER_ROLES.manager]))
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }

  @Post(PRODUCT_ROUTES.getProducts)
  @ApiOperation({ summary: PRODUCT_ROUTES.getProducts })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT_ROUTES.getProducts,
    type: [ProductEntity],
  })
  @HttpCode(HttpStatus.OK)
  async getProducts(@Body() filter: FilterDto, @Query() pageOptionsDto: PageOptionsDto) {
    return this.productService.getProducts(pageOptionsDto, filter);
  }

  @Get(PRODUCT_ROUTES.getProductCategories)
  @ApiOperation({ summary: PRODUCT_ROUTES.getProductCategories })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT_ROUTES.getProductCategories,
  })
  @HttpCode(HttpStatus.OK)
  async getProductCategories() {
    return this.productService.getProductCategories();
  }
}
