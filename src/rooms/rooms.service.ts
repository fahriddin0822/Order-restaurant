import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { BranchesService } from '../branches/branches.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private roomModel: typeof Room,
    private branchService:BranchesService
) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    if(! await this.branchService.findOne(createRoomDto.branchId)){
      throw new NotFoundException("Branch not found with this ID.");
    }
    return await this.roomModel.create(createRoomDto);
  }

  async findAll(): Promise<Room[]> {
    return await this.roomModel.findAll({
      include: { all: true }
    });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomModel.findByPk(id, { include: { all: true } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    await room.update(updateRoomDto);
    return room;
  }

  async remove(id: number): Promise<string> {
    const result = await this.roomModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Room with ${id}-ID was not found.`);
    }

    return `Room with ${id}-ID deleted successfully.`;
  }

}
