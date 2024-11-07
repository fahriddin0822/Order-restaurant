import { Module } from '@nestjs/common';
import { OrderTableService } from './order_table.service';
import { OrderTableController } from './order_table.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderTable } from './schemas/order_table.schema';

@Module({
  imports:[SequelizeModule.forFeature([OrderTable])],
  controllers: [OrderTableController],
  providers: [OrderTableService],
})
export class OrderTableModule {}
