// src/menu/menu.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './schemas/menu.schema';
import { MealsService } from '../meals/meals.service';
import { BranchesService } from '../branches/branches.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu)
    private readonly menuModel: typeof Menu,
    private mealService: MealsService,
    private branchesService: BranchesService
  ) { }

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {

    if (! await this.mealService.findOne(createMenuDto.mealId)){
      throw new NotFoundException("Meal is not valid.");
    }

    if (! await this.branchesService.findOne(createMenuDto.branchId)){
      throw new NotFoundException("Branch is not valid.");
    }

      if (await this.findByName(createMenuDto.name)) {
        throw new BadRequestException("Menu is already exist.")
      }
    return await this.menuModel.create(createMenuDto);
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuModel.findByPk(id, { include: { all: true } });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  async findByName(name: string): Promise<Menu> {
    return await this.menuModel.findOne({ where: { name } });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.findOne(id);
    await menu.update(updateMenuDto);
    return menu;
  }

  async remove(id: number): Promise<string> {
    const result = await this.menuModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Menu with ${id}-ID was not found.`);
    }

    return `Menu with ${id}-ID deleted successfully.`;
  }

}
