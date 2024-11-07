import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './schemas/payment.schema';

@Module({
  imports:[SequelizeModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
