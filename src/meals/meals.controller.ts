// src/meals/meals.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards, NotFoundException } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Meal } from './schemas/meal.schema';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { where } from 'sequelize';
import { NotFoundError } from 'rxjs';

@Roles("SUPERADMIN")
@ApiTags('Meals')
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) { }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a new meal' })
  @ApiResponse({ status: 201, description: 'The meal has been successfully created.' })
  async create(@Body() createMealDto: CreateMealDto) {
    return this.mealsService.create(createMealDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all meals' })
  @ApiResponse({ status: 200, description: 'Returns an array of meals.' })
  findAll() {
    return this.mealsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a meal by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single meal.' })
  @ApiResponse({ status: 404, description: 'Meal not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mealsService.findOne(id);
  }

  @Get('name/:name')  // The path should include a colon (:) before the parameter name
  @ApiOperation({ summary: 'Retrieve a meal by name' })
  @ApiResponse({ status: 200, description: 'Returns a single meal.' })
  @ApiResponse({ status: 404, description: 'Meal not found.' })
  findOneByName(@Param('name') name: string) {
    return this.mealsService.findByName(name);
  }


  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a meal by ID' })
  @ApiResponse({ status: 200, description: 'The meal has been successfully updated.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMealDto: UpdateMealDto) {
    return this.mealsService.update(id, updateMealDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a meal by ID' })
  @ApiResponse({ status: 200, description: 'The meal has been successfully deleted.', schema: { example: { message: "Meal with {id}-ID deleted successfully." } } })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
    const message = await this.mealsService.remove(+id);
    return { message };
  }

}
