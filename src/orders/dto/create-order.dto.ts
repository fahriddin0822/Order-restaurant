import { IsInt, IsString, IsBoolean, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    userId: number;

    @IsString()
    event_name: string;

    @IsInt()
    branchId: number;

    @IsDateString()
    date: string;

    @IsString()
    duration: string;

    @IsInt()
    @Min(1)
    visitors_number: number;

    @IsBoolean()
    reservation_status: boolean;

    @IsNumber()
    total_price: number;
}
