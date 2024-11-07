import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderTableDto {
  @ApiProperty({
    description: 'Unique identifier for the table',
    example: 1,
  })
  @IsNotEmpty({ message: 'Table ID is required.' })
  @IsNumber({}, { message: 'Table ID must be a number.' })
  tableId: number;

  @ApiProperty({
    description: 'Unique identifier for the order',
    example: 101,
  })
  @IsNotEmpty({ message: 'Order ID is required.' })
  @IsNumber({}, { message: 'Order ID must be a number.' })
  orderId: number;
}
