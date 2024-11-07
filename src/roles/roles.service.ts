import { Roles } from "./schemas/role.schema";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectModel } from "@nestjs/sequelize";
import { NotFoundError } from "rxjs";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private roleModel: typeof Roles) { }

  async create(createRoleDto: CreateRoleDto): Promise<Roles> {
    if(await this.findRoleByName(createRoleDto.name)){
      throw new BadRequestException(`${createRoleDto.name} is already exist.`)
    }
    return await this.roleModel.create({
      name: createRoleDto.name.toUpperCase(),
      description: createRoleDto.description,
    });
  }

  async findAll(): Promise<Roles[]> {
    return await this.roleModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Roles> {
    return await this.roleModel.findOne({ where: { id } });
  }

  async findRoleByName(name: string): Promise<Roles> {
    return this.roleModel.findOne({ where: { name:name.toUpperCase() } })
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const newRole = this.roleModel.update({
      name: updateRoleDto.name.toUpperCase(),
      description: updateRoleDto.description,
    }, { where: { id }, returning: true });
    return newRole[1]
  }

  async remove(id: number): Promise<string> {
    const result = await this.roleModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Role with ${id}-ID was not found.`);
    }

    return `Role with ${id}-ID deleted successfully.`;
  }

}
