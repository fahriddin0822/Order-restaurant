import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderTableDto } from './dto/create-order_table.dto';
import { UpdateOrderTableDto } from './dto/update-order_table.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderTable } from './schemas/order_table.schema';
import { NotFoundError } from 'rxjs';

@Injectable()
export class OrderTableService {
  constructor(@InjectModel(OrderTable) private orderTableModel: typeof OrderTable) { }

  create(createOrderTableDto: CreateOrderTableDto) {
    return this.orderTableModel.create(createOrderTableDto);
  }

  findAll() {
    return this.orderTableModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.orderTableModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateOrderTableDto: UpdateOrderTableDto) {
    return this.orderTableModel.update(updateOrderTableDto, { where: { id } });
  }

  async remove(id: number): Promise<string> {
    const result = await this.orderTableModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Order table with ${id}-ID was not found.`);
    }

    return `Order table with ${id}-ID deleted successfully.`;
  }

}
