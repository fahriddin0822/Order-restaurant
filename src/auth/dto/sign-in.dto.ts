
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInWorkerDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
