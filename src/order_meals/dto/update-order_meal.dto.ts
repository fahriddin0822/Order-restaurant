// src/order-meal/dto/update-order-meal.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, MaxLength, IsOptional } from 'class-validator';

export class UpdateOrderMealDto {
  @ApiProperty({ example: 3, description: 'Quantity of the meal ordered', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity?: number;

  @ApiProperty({ example: 'No onions, please', description: 'Special wishes or requests for the meal', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Wishes can be up to 255 characters' })
  wishes?: string;
}
