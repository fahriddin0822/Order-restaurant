// src/menu/schemas/menu.schema.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Meal } from '../../meals/schemas/meal.schema';
import { Branches } from '../../branches/schemas/branch.schema';

interface MenuCreationAttr {
    name: string
}


@Table({ tableName: 'menus', timestamps: true })
export class Menu extends Model<Menu, MenuCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @ForeignKey(() => Branches)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    branchId: number;

    @ForeignKey(() => Meal)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    mealId: number;

    @BelongsTo(() => Meal)
    meal: Meal

    @BelongsTo(() => Branches)
    branches: Branches
}
