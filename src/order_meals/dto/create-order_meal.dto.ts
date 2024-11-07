import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, MaxLength } from 'class-validator';

export class CreateOrderMealDto {
  @ApiProperty({ example: 1, description: 'ID of the order' })
  @IsNotEmpty({ message: 'Order ID is required' })
  @IsNumber({}, { message: 'Order ID must be a number' })
  orderId: number;

  @ApiProperty({ example: 2, description: 'ID of the meal' })
  @IsNotEmpty({ message: 'Meal ID is required' })
  @IsNumber({}, { message: 'Meal ID must be a number' })
  mealId: number;

  @ApiProperty({ example: 3, description: 'Quantity of the meal ordered' })
  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @ApiProperty({
    example: 'No onions, please',
    description: 'Special wishes or requests for the meal',
    required: false,
  })
  @IsString({ message: 'Wishes must be a string' })
  @MaxLength(255, { message: 'Wishes can be up to 255 characters' })
  wishes?: string;
}
