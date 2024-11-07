import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';
import { OrderMeal } from '../order_meals/schemas/order_meal.schema';
import { Meal } from '../meals/schemas/meal.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Here you can add any validation if necessary
    const newOrder = await this.orderModel.create(createOrderDto);
    return newOrder;
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.findAll({
      include: [
        { all: true },
        {
          model: OrderMeal,
          include: [{ model: Meal }]
        }
      ]
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findOne({
      where: { id },
      include: [
        { all: true }, // This includes `user` and `branch` directly
        {
          model: OrderMeal,
          include: [Meal] // This includes the `Meal` details within each `OrderMeal`
        }
      ]
    });
  
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return order;
  }
  

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const [numberOfAffectedRows, [updatedOrder]] = await this.orderModel.update(updateOrderDto, {
      where: { id },
      returning: true,
    });

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderModel.destroy({ where: { id } });
    if (result === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
