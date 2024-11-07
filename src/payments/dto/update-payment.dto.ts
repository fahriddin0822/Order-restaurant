// src/payment/dto/create-payment.dto.ts
import { IsInt, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({ example: 1, description: 'ID of the user' })
    @IsInt()
    userId: number;

    @ApiProperty({ example: 100.50, description: 'Amount of the payment' })
    @IsNumber()
    amount: number;

    @ApiProperty({ example: true, description: 'Indicates if the payment was made by card' })
    @IsBoolean()
    is_card: boolean;
}
