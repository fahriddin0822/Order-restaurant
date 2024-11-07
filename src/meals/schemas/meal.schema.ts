// src/meals/schemas/meal.schema.ts
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Category } from '../../category/schemas/category.schema';
import { OrderMeal } from '../../order_meals/schemas/order_meal.schema';
import { Menu } from '../../menu/schemas/menu.schema';

interface MealCreationAttr {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    image_url: string;
}


@Table({ tableName: 'meals' })
export class Meal extends Model<Meal, MealCreationAttr> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @ForeignKey(()=>Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    categoryId: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image_url: string;

    @BelongsTo(()=>Category)
    category:Category;

    @HasMany(()=>OrderMeal)
    orderMeals:OrderMeal[];

    @HasMany(()=>Menu)
    menus:Menu[];
}
