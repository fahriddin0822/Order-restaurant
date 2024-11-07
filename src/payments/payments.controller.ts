import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/update-payment.dto';
import { UpdatePaymentDto } from './dto/create-payment.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { SelfGuard } from '../guards/self.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.paymentsService.remove(+id);
  }
}
