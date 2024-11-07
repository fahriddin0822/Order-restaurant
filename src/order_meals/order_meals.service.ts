import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderMeal } from './schemas/order_meal.schema';
import { CreateOrderMealDto } from './dto/create-order_meal.dto';
import { UpdateOrderMealDto } from './dto/update-order_meal.dto';
import { Order } from '../orders/schemas/order.schema';
import { Meal } from '../meals/schemas/meal.schema';
import { OrdersService } from '../orders/orders.service';
import { MealsService } from '../meals/meals.service';

@Injectable()
export class OrderMealsService {
  constructor(
    @InjectModel(OrderMeal)
    private readonly orderMealModel: typeof OrderMeal,
    private readonly orderService: OrdersService,
    private readonly mealService: MealsService,
  ) { }

  // Create a new order meal entry
  async create(createOrderMealDto: CreateOrderMealDto): Promise<OrderMeal> {
    // Check if the referenced order exists
    const orderExists = await this.orderService.findOne(createOrderMealDto.orderId);
    if (!orderExists) {
      throw new NotFoundException(`Order with ID ${createOrderMealDto.orderId} does not exist.`);
    }

    // Check if the referenced meal exists
    const mealExists = await this.mealService.findOne(createOrderMealDto.mealId);
    if (!mealExists) {
      throw new NotFoundException(`Meal with ID ${createOrderMealDto.mealId} does not exist.`);
    }

    // Proceed to create OrderMeal
    return await this.orderMealModel.create(createOrderMealDto);
  }

  // Retrieve all order meal entries
  async findAll(): Promise<OrderMeal[]> {
    return await this.orderMealModel.findAll({ include: { all: true } });
  }

  // Retrieve a single order meal entry by ID
  async findOne(id: number): Promise<OrderMeal> {
    const orderMeal = await this.orderMealModel.findByPk(id, { include: { all: true } });
    if (!orderMeal) {
      throw new NotFoundException(`OrderMeal with ID ${id} not found`);
    }
    return orderMeal;
  }

  // Update an existing order meal entry
  async update(id: number, updateOrderMealDto: UpdateOrderMealDto): Promise<OrderMeal> {
    const orderMeal = await this.findOne(id); // Find the order meal or throw a 404 error if not found
    return await orderMeal.update(updateOrderMealDto);
  }

  // Delete an order meal entry
  async remove(id: number): Promise<void> {
    const orderMeal = await this.findOne(id);
    await orderMeal.destroy();
  }
}
