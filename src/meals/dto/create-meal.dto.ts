// src/meals/dto/create-meal.dto.ts
import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateMealDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsUrl()
  image_url: string;
}
