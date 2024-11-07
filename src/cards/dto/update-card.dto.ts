import { IsString, IsNumber, IsDateString, Length, IsOptional } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters long.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Holder full name must be a string.' })
  @Length(1, 100, { message: 'Holder full name must be between 1 and 100 characters long.' })
  holder_full_name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Card number must be a number.' })
  number?: number;

  @IsOptional()
  @IsDateString({}, { message: 'Given date must be a valid date string.' })
  given_date?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Expiration date must be a valid date string.' })
  expiration_date?: string;
}
