// src/category/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id, { include: { all: true } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const [affectedCount, [updatedCategory]] = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return updatedCategory;
  }

  async remove(id: number): Promise<{ message: string; deletedCategory: Category }> {
    const category = await this.findOne(id);
    await this.categoryModel.destroy({ where: { id } });
    return {
      message: `Category with ID ${id} and name "${category.name}" has been successfully deleted.`,
      deletedCategory: category,
    };
  }
}
