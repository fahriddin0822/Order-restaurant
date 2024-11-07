// src/category/schemas/category.schema.ts

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Meal } from "../../meals/schemas/meal.schema";

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @HasMany(()=>Meal)
  meals:Meal;
}
