import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branches } from './schemas/branch.schema';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/sequelize';
import { Menu } from '../menu/schemas/menu.schema';

@Injectable()
export class BranchesService {

  constructor(@InjectModel(Branches) private branchesModel: typeof Branches) { }

  async create(createBranchDto: CreateBranchDto) {
    if(await this.findByPhoneNumber(createBranchDto.phone)){
      throw new BadRequestException("Branch with this phone number is already exist.");
    }
    const newBranch = await this.branchesModel.create({ ...createBranchDto, phone: `+${createBranchDto.phone}` });
    return newBranch;
  }

  findAll() {
    return this.branchesModel.findAll({
      attributes: ['id','name', 'location', 'target_location', 'phone'],
      include: [
        {
          model: Menu,
          attributes: ['name'],
        },
      ],
    });
  }
  

  findOne(id: number) {
    return this.branchesModel.findOne({where: { id }, include:{all:true} });
  }

  async findByPhoneNumber(phone_number: string): Promise<Branches> {
    return this.branchesModel.findOne({ where: { phone: `+${phone_number}` } });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branches> {
    const candidate = this.findOne(id);
    if (!candidate) {
      throw new NotFoundException("Worker not found.");
    }
    const worker = await this.branchesModel.update(updateBranchDto, { where: { id }, returning: true });
    return worker[1][0];
  }

  async remove(id: number): Promise<string> {
    const result = await this.branchesModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Branch with ${id}-ID was not found.`)
    }

    return `Branch with ${id}-ID deleted successfully.`;
  }
}
