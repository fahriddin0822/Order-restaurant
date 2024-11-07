// src/category/category.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './schemas/category.schema';
import { Roles } from '../../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Roles("SUPERADMIN")
@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.', type: Category })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiResponse({ status: 200, description: 'Returns an array of categories.', type: [Category] })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a category by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single category.', type: Category })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse({ status: 200, description: 'The category has been successfully updated.', type: Category })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({ status: 204, description: 'The category has been successfully deleted.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.remove(id);
  }
}
