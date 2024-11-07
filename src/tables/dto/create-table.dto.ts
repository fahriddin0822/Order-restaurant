import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTableDto {
    @IsNotEmpty()
    @IsNumber()
    roomId: number;

    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @IsNotEmpty()
    @IsBoolean()
    is_booked: boolean;
}