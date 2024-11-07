import { IsNotEmpty, IsNumberString, IsString, MinLength } from 'class-validator';
import { Length } from 'sequelize-typescript';

export class SignInUserDto {
    @IsNotEmpty({ message: 'Phone number is required.' })
    @IsString({ message: 'Phone number must be a string.' })
    @IsNumberString({}, { message: 'Phone number must contain only numbers.' })
    phone: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
