import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/update-payment.dto';
import { UpdatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) { }
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.paymentModel.findOne({ where: { id } , include: { all: true } });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const candidate = this.findOne(id);
    if (!candidate) {
      throw new NotFoundException("Payment not found.");
    }
    const payment = await this.paymentModel.update(updatePaymentDto, { where: { id }, returning: true });
    return payment[1][0];
  }

  async remove(id: number): Promise<string> {
    const result = await this.paymentModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Payment with ${id}-ID was not found.`);
    }

    return `Payment with ${id}-ID deleted successfully.`;
  }

}
