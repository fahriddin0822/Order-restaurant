import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name cannot be empty if provided.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;
}
