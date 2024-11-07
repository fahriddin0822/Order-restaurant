import { Module } from '@nestjs/common';
import { OrderMealsService } from './order_meals.service';
import { OrderMealsController } from './order_meals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderMeal } from './schemas/order_meal.schema';
import { OrdersModule } from '../orders/orders.module';
import { MealsModule } from '../meals/meals.module';

@Module({
  imports: [SequelizeModule.forFeature([OrderMeal]),
    OrdersModule, 
    MealsModule],
  controllers: [OrderMealsController],
  providers: [OrderMealsService],
})
export class OrderMealsModule { }
