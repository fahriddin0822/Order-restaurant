import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class UpdateBranchDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters long.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Location must be a string.' })
  @Length(1, 100, { message: 'Location must be between 1 and 100 characters long.' })
  location?: string;

  @IsOptional()
  @IsString({ message: 'Target location must be a string.' })
  @Length(1, 100, { message: 'Target location must be between 1 and 100 characters long.' })
  target_location?: string;

  @IsOptional()
  @IsString({ message: 'Phone number must be a string.' })
  phone?: string;
}
