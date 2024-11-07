import { IsString, MinLength, Length, IsBoolean, IsOptional, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';


export class SignUpWorkerDto {
    @IsNotEmpty({ message: 'Email is required.' })
    @IsString({ message: 'Email must be a string.' })
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @IsString({ message: 'Password must be a string.' })
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    password: string;

    @IsNotEmpty({ message: 'Full name is required.' })
    @IsString({ message: 'Full name must be a string.' })
    full_name: string;

    @IsNotEmpty({ message: 'Role is required.' })
    @IsString({ message: 'Role must be a string.' })
    role: string; // Ensure this matches the expected type in Workers

    @IsOptional()
    @IsBoolean({ message: 'Active status must be a boolean.' })
    is_active: boolean;

    @IsNotEmpty({ message: 'Phone number is required.' })
    @IsString()
    @IsNumberString({}, { message: 'Phone number must be a valid number.' })
    @Length(12, 12, { message: 'Phone number must be exactly 12 digits.' })
    phone: string;

    @IsOptional()
    @IsString({ message: 'Refresh token must be a string.' })
    hashed_refresh_token?: string;
}
