import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderTableService } from './order_table.service';
import { CreateOrderTableDto } from './dto/create-order_table.dto';
import { UpdateOrderTableDto } from './dto/update-order_table.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('order-table')
export class OrderTableController {
  constructor(private readonly orderTableService: OrderTableService) {}

  @Post()
  create(@Body() createOrderTableDto: CreateOrderTableDto) {
    return this.orderTableService.create(createOrderTableDto);
  }

  @Get('all')
  findAll() {
    return this.orderTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.orderTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateOrderTableDto: UpdateOrderTableDto) {
    return this.orderTableService.update(+id, updateOrderTableDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a order_table by ID' })
  @ApiResponse({ status: 200, description: 'The order_table has been successfully deleted.', schema: { example: { message: "order_table with {id}-ID deleted successfully." } } })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
    const message = await this.orderTableService.remove(+id);
    return { message };
  }
}
