// src/meals/meals.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meal } from './schemas/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectModel(Meal)
    private readonly mealModel: typeof Meal,
  ) { }

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    return await this.mealModel.create(createMealDto);
  }

  async findAll(): Promise<Meal[]> {
    return await this.mealModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Meal> {
    const meal = await this.mealModel.findByPk(id, { include: { all: true } });
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return meal;
  }

  async findByName(name: string): Promise<Meal> {
    const meal = await this.mealModel.findOne({ where: { name } });
    if (!meal) {
      throw new NotFoundException(`Meal with name ${name} not found`);
    }
    return meal;
  }

  async update(id: number, updateMealDto: UpdateMealDto): Promise<Meal> {
    const [affectedCount, [updatedMeal]] = await this.mealModel.update(updateMealDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }

    return updatedMeal;
  }

  async remove(id: number) {
    return this.mealModel.destroy({ where: { id } })
  }
}
