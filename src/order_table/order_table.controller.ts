import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrderTableService } from './order_table.service';
import { CreateOrderTableDto } from './dto/create-order_table.dto';
import { UpdateOrderTableDto } from './dto/update-order_table.dto';

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
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.orderTableService.remove(+id);
  }
}
