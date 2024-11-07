import { IsNotEmpty, IsString, IsNumber, IsDateString, Length, MinLength, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters long.' })
  name: string;

  @IsNotEmpty({ message: 'Holder full name is required.' })
  @IsString({ message: 'Holder full name must be a string.' })
  @Length(1, 100, { message: 'Holder full name must be between 1 and 100 characters long.' })
  holder_full_name: string;

  @IsNotEmpty({ message: 'Card number is required.' })
  @IsNumber({}, { message: 'Card number must be a number.' })
  number: number;

  @IsNotEmpty({ message: 'Given date is required.' })
  @IsDateString({}, { message: 'Given date must be a valid date string.' })
  given_date: string;

  @IsNotEmpty({ message: 'User ID is required.' })
  @IsNumber({}, { message: 'User ID must be a number.' })
  userId:number;

  @IsNotEmpty({ message: 'Expiration date is required.' })
  @IsDateString({}, { message: 'Expiration date must be a valid date string.' })
  expiration_date: string;
}
