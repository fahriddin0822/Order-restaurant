import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateMealDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number.' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Category ID must be a number.' })
  categoryId?: number;

  @IsOptional()
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  image_url?: string;
}
