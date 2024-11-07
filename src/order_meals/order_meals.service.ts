import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderMeal } from './schemas/order_meal.schema';
import { CreateOrderMealDto } from './dto/create-order_meal.dto';
import { UpdateOrderMealDto } from './dto/update-order_meal.dto';
import { Order } from '../orders/schemas/order.schema';
import { Meal } from '../meals/schemas/meal.schema';
import { OrdersService } from '../orders/orders.service';
import { MealsService } from '../meals/meals.service';
import { transcode } from 'buffer';

@Injectable()
export class OrderMealsService {
  constructor(
    @InjectModel(OrderMeal)
    private readonly orderMealModel: typeof OrderMeal,
    private readonly orderService: OrdersService,
    private readonly mealService: MealsService,
  ) { }

  async create(createOrderMealDto: CreateOrderMealDto): Promise<OrderMeal> {
    const orderExists = await this.orderService.findOne(createOrderMealDto.orderId);
    if (!orderExists) {
      throw new NotFoundException(`Order with ID ${createOrderMealDto.orderId} does not exist.`);
    }

    const mealExists = await this.mealService.findOne(createOrderMealDto.mealId);
    if (!mealExists) {
      throw new NotFoundException(`Meal with ID ${createOrderMealDto.mealId} does not exist.`);
    }
    return await this.orderMealModel.create(createOrderMealDto);
  }

  async findAll(): Promise<OrderMeal[]> {
    return await this.orderMealModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<OrderMeal> {
    const orderMeal = await this.orderMealModel.findByPk(id, { include: { all: true } });
    if (!orderMeal) {
      throw new NotFoundException(`OrderMeal with ID ${id} not found`);
    }
    return orderMeal;
  }

  async update(id: number, updateOrderMealDto: UpdateOrderMealDto): Promise<OrderMeal> {
    const orderMeal = await this.findOne(id);
    return await orderMeal.update(updateOrderMealDto);
  }

  async remove(id: number): Promise<string> {
    const result = await this.orderMealModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Order meal with ${id}-ID was not found.`);
    }

    return `Order meal with ${id}-ID deleted successfully.`;
  }

}
