import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tables } from './schemas/table.schema';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Tables) private tableModel: typeof Tables,
    private roomService: RoomsService
  ) { }

  async create(createTableDto: CreateTableDto): Promise<Tables> {
    if (! await this.roomService.findOne(createTableDto.roomId)) {
      throw new NotFoundException("Room not found.");
    }
    return this.tableModel.create(createTableDto);
  }

  async findAll(): Promise<Tables[]> {
    return this.tableModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Tables> {
    const table = await this.tableModel.findByPk(id, { include: { all: true } });
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto): Promise<Tables> {
    await this.findOne(id);
    await this.tableModel.update(updateTableDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    const table = await this.findOne(id);
    return this.tableModel.destroy({ where: { id: table.id } });
  }
}
