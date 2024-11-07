import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, MaxLength } from 'class-validator';
import { Meal } from '../../meals/schemas/meal.schema';
import { Order } from '../../orders/schemas/order.schema';
// import { Order } from './order.model';  // Assumed that you have an Order model
// import { Meal } from './meal.model';    // Assumed that you have a Meal model

@Table({ tableName: 'order_meals', timestamps: false })
export class OrderMeal extends Model<OrderMeal> {
  
  @ApiProperty({ example: 1, description: 'The ID of the order this meal is associated with' })
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @ApiProperty({ example: 2, description: 'The ID of the meal ordered' })
  @ForeignKey(() => Meal)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  mealId: number;

  @ApiProperty({ example: 3, description: 'The quantity of the meal ordered' })
  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({ example: 'No onions, please', description: 'Special wishes or requests for the meal', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  wishes?: string;

  @BelongsTo(()=>Order)
  order:Order;

  @BelongsTo(()=>Meal)
  meal:Meal;
}
