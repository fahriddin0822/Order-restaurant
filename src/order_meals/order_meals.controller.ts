import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { OrderMealsService } from './order_meals.service';
import { CreateOrderMealDto } from './dto/create-order_meal.dto';
import { UpdateOrderMealDto } from './dto/update-order_meal.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SelfGuard } from '../guards/self.guard';

@ApiTags('order-meals')
@Controller('order-meals')
export class OrderMealsController {
  constructor(private readonly orderMealsService: OrderMealsService) { }

  @ApiOperation({ summary: 'Create a new order meal' })
  @ApiResponse({ status: 201, description: 'Order meal created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed for request data.' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderMealDto: CreateOrderMealDto) {
    return this.orderMealsService.create(createOrderMealDto);
  }

  @ApiOperation({ summary: 'Retrieve all order meals' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved list of order meals.' })
  @Get()
  findAll() {
    return this.orderMealsService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a specific order meal by ID' })
  @ApiResponse({ status: 200, description: 'Order meal retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order meal not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.orderMealsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an order meal by ID' })
  @ApiResponse({ status: 200, description: 'Order meal updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order meal not found.' })
  @ApiResponse({ status: 400, description: 'Bad request due to validation error.' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateOrderMealDto: UpdateOrderMealDto) {
    return this.orderMealsService.update(+id, updateOrderMealDto);
  }


  @UseGuards(SelfGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a meal by ID' })
  @ApiResponse({ status: 200, description: 'The meal has been successfully deleted.', schema: { example: { message: "Meal with {id}-ID deleted successfully." } } })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
    const message = await this.orderMealsService.remove(+id);
    return { message };
  }
}
