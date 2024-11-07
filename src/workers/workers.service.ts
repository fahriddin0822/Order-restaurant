import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpWorkerDto, UpdateWorkerDto } from './dto';
import { Workers } from './models/workers.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { AddRemoveRoleDto } from './dto/worker-add-remove-role.dto';
import { ActivateWorkerDto } from './dto/worker-activate.dto';
import { Roles } from '../roles/schemas/role.schema';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Workers) private workersModel: typeof Workers,
    private readonly rolesService: RolesService
  ) {}

  async create(signUpWorkerDto: SignUpWorkerDto): Promise<Workers> {
    const phone = `+${signUpWorkerDto.phone}`;
    const newWorker = await this.workersModel.create({
      ...signUpWorkerDto,
      phone_number: phone,
      hashed_password: signUpWorkerDto.password,
    });

    const role = await this.rolesService.findRoleByName(signUpWorkerDto.role);
    if (!role) throw new NotFoundException("Role not found");

    await newWorker.$set("roles", [role.id]);
    await newWorker.save();
    newWorker.roles = [role];
    return newWorker;
  }

  async updateRefreshToken(workerId: number, refreshToken: string | null): Promise<void> {
    const worker = await this.workersModel.findByPk(workerId);
    if (!worker) throw new NotFoundException('Worker not found');
    worker.hashed_refresh_token = refreshToken;
    await worker.save();
  }

  async findByEmail(email: string): Promise<Workers> {
    return  await this.workersModel.findOne({ 
      where: { email },
      include: { model: Roles, through: { attributes: [] } }
    });
    
    
  }

  async findByPhoneNumber(phone_number: string): Promise<Workers> {
    return this.workersModel.findOne({ where: { phone_number: `+${phone_number}` } });
  }

  async addRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const worker = await this.workersModel.findByPk(addRemoveRoleDto.workerId);
    const role = await this.rolesService.findRoleByName(addRemoveRoleDto.role_name);
    if (!worker || !role) throw new NotFoundException("Worker or role not found.");

    await worker.$add("roles", role.id);
    return this.workersModel.findByPk(addRemoveRoleDto.workerId, { include: { all: true } });
  }

  async removeRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const worker = await this.workersModel.findByPk(addRemoveRoleDto.workerId);
    const role = await this.rolesService.findRoleByName(addRemoveRoleDto.role_name);
    if (!worker || !role) throw new NotFoundException("Worker or role not found.");

    await worker.$remove("roles", role.id);
    return this.workersModel.findByPk(addRemoveRoleDto.workerId, { include: { all: true } });
  }

  async activateWorker(activateWorkerDto: ActivateWorkerDto) {
    const worker = await this.workersModel.findByPk(activateWorkerDto.workerId);
    if (!worker) throw new NotFoundException("Worker not found.");

    worker.is_active = true;
    await worker.save();
    return worker;
  }

  async deactivateWorker(activateWorkerDto: ActivateWorkerDto) {
    const worker = await this.workersModel.findByPk(activateWorkerDto.workerId);
    if (!worker) throw new NotFoundException("Worker not found.");

    worker.is_active = false;
    await worker.save();
    return worker;
  }

  findAll(): Promise<Workers[]> {
    return this.workersModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Workers> {
    const worker = await this.workersModel.findOne({ where: { id }, include: { all: true } });
    if (!worker) throw new NotFoundException("Worker not found.");
    return worker;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto): Promise<Workers> {
    const [count, workers] = await this.workersModel.update(updateWorkerDto, { where: { id }, returning: true });
    if (count === 0) throw new NotFoundException("Worker not found.");
    return workers[0];
  }

  async remove(id: number): Promise<string> {
    const result = await this.workersModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Worker with ${id}-ID was not found.`);
    }

    return `Worker with ${id}-ID deleted successfully.`;
  }

}
