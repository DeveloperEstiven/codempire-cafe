import { Repository } from 'typeorm';

import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import JwtAuthenticationGuard from 'src/guards/auth.guard';
import { USER_ROLES } from 'src/user/user.constants';
import { MessageSuccessDto } from '../dto/message-success.dto';
import { RoleGuard } from '../guards/role.guard';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientEntity } from './entities/ingredient.entity';
import { INGREDIENT_ERRORS, INGREDIENT_ROUTES } from './ingredient.constants';
import { IngredientService } from './ingredient.service';

@ApiTags(INGREDIENT_ROUTES.main)
@Controller(INGREDIENT_ROUTES.main)
export class IngredientController {
  @InjectRepository(IngredientEntity) private readonly ingredientRepository: Repository<IngredientEntity>;
  constructor(private readonly ingredientService: IngredientService) {}

  @Post(INGREDIENT_ROUTES.addIngredient)
  @ApiOperation({ summary: INGREDIENT_ROUTES.addIngredient })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: INGREDIENT_ROUTES.addIngredient,
    type: CreateIngredientDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: INGREDIENT_ERRORS.alreadyExist,
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthenticationGuard, new RoleGuard([USER_ROLES.manager]))
  addIngredient(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.addIngredient(createIngredientDto);
  }

  @Delete(INGREDIENT_ROUTES.removeIngredient + '/:id')
  @ApiOperation({ summary: INGREDIENT_ROUTES.removeIngredient })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INGREDIENT_ROUTES.removeIngredient,
    type: MessageSuccessDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: INGREDIENT_ERRORS.notFound,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard, new RoleGuard([USER_ROLES.manager]))
  removeIngredient(@Param('id') id: string) {
    return this.ingredientService.removeIngredient(id);
  }

  @Get(INGREDIENT_ROUTES.getAllIngredients)
  @ApiOperation({ summary: INGREDIENT_ROUTES.getAllIngredients })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INGREDIENT_ROUTES.getAllIngredients,
    type: [IngredientEntity],
  })
  @HttpCode(HttpStatus.OK)
  async getAllIngredients() {
    return this.ingredientRepository.find();
  }

  @Get(INGREDIENT_ROUTES.checkIngredientContains + '/:id')
  @ApiOperation({ summary: INGREDIENT_ROUTES.checkIngredientContains })
  @ApiResponse({
    status: HttpStatus.OK,
    description: INGREDIENT_ROUTES.checkIngredientContains,
    type: [IngredientEntity],
  })
  @HttpCode(HttpStatus.OK)
  async checkIngredientContains(@Param('id') id: string) {
    return this.ingredientService.checkIngredientContains(id);
  }
}
