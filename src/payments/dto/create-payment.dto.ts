// src/payment/dto/update-payment.dto.ts
import { IsInt, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDto {
    @ApiProperty({ example: 1, description: 'ID of the user', required: false })
    @IsOptional()
    @IsInt()
    userId?: number;

    @ApiProperty({ example: 100.50, description: 'Amount of the payment', required: false })
    @IsOptional()
    @IsNumber()
    amount?: number;

    @ApiProperty({ example: true, description: 'Indicates if the payment was made by card', required: false })
    @IsOptional()
    @IsBoolean()
    is_card?: boolean;
}
