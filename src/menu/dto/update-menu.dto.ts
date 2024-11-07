import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiPropertyOptional({ description: 'Name of the menu', example: 'Lunch Menu' })
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  name?: string;
}
