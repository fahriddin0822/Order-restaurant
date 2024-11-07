import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Brackets } from "typeorm";
import { Branches } from "../../branches/schemas/branch.schema";
import { Users } from "../../users/schemas/user.schema";
import { OrderMeal } from "../../order_meals/schemas/order_meal.schema";
import { Tables } from "../../tables/schemas/table.schema";
import { OrderTable } from "../../order_table/schemas/order_table.schema";

interface OrderCreationAttribute {
    userId: number;
    event_name: string;
    branchId: number;
    date: string;
    duration: string;
    visitors_number: number;
    reservation_status: boolean;
    total_price: number;
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, OrderCreationAttribute> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    event_name: string;

    @ForeignKey(() => Branches)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    branchId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    date: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    duration: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    visitors_number: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    reservation_status: boolean;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    })
    total_price: number;

    @BelongsTo(() => Branches)
    branch: Branches;

    @BelongsTo(() => Users)
    user: Users;

    @HasMany(() => OrderMeal)
    orderMeal: OrderMeal[]

    @BelongsToMany(() => Tables, () => OrderTable)
    tables: Tables[];
}
