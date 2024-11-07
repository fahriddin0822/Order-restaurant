import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from '../../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SelfGuard } from '../guards/self.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get('all')
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(JwtAuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.ordersService.findOne(+id);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.ordersService.remove(+id);
  }
}
