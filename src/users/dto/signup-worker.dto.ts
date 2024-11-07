import { IsNotEmpty, IsNumberString, IsString, Length, MinLength } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty({ message: 'Full name is required.' })
  @IsString({ message: 'Full name must be a valid string.' })
  full_name: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsString({ message: 'Phone number must be a string.' })
  @IsNumberString({}, { message: 'Phone number must contain only numbers.' })
  @Length(12, 12, { message: 'Phone number must be exactly 12 digits, including country code.' })
  phone: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a valid string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @IsNotEmpty({ message: 'Additional phone number is required.' })
  @IsString({ message: 'Additional phone number must be a string.' })
  @IsNumberString({}, { message: 'Additional phone number must contain only numbers.' })
  @Length(12, 12, { message: 'Additional phone number must be exactly 12 digits, including country code.' })
  additional_phone: string;
}
