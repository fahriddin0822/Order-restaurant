// src/menu/dto/create-menu.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: 'Name of the menu', example: 'Dinner Menu' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  branchId: number;
  
  @IsNotEmpty()
  @IsNumber()
  mealId: number;
}
