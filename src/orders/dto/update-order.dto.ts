// src/order/dto/update-order.dto.ts
import { IsInt, IsString, IsBoolean, IsNumber, IsDateString, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
    @ApiProperty({ example: 1, description: 'ID of the user', required: false })
    @IsOptional()
    @IsInt()
    userId?: number;

    @ApiProperty({ example: 'Birthday Party', description: 'Name of the event', required: false })
    @IsOptional()
    @IsString()
    event_name?: string;

    @ApiProperty({ example: 2, description: 'ID of the branch', required: false })
    @IsOptional()
    @IsInt()
    branchId?: number;

    @ApiProperty({ example: '2024-11-05', description: 'Date of the order', required: false })
    @IsOptional()
    @IsDateString()
    date?: string;

    @ApiProperty({ example: '2 hours', description: 'Duration of the event', required: false })
    @IsOptional()
    @IsString()
    duration?: string;

    @ApiProperty({ example: 5, description: 'Number of visitors', required: false })
    @IsOptional()
    @IsInt()
    @Min(1, { message: 'Number of visitors must be at least 1' })
    visitors_number?: number;

    @ApiProperty({ example: true, description: 'Reservation status', required: false })
    @IsOptional()
    @IsBoolean()
    reservation_status?: boolean;

    @ApiProperty({ example: 100, description: 'Total price of the order', required: false })
    @IsOptional()
    @IsNumber()
    total_price?: number;
}
