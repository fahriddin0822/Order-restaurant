import { IsNotEmpty, IsString } from "class-validator";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Workers } from "../../workers/models/workers.model";
import { Order } from "../../orders/schemas/order.schema";
import { Reviews } from "../../reviews/schemas/review.schema";
import { Menu } from "../../menu/schemas/menu.schema";
import { Room } from "../../rooms/schemas/room.schema";

interface BranchesCreationAttribute{
    name: string;
    location: string;
    target_location: string;
    phone: string;
}

@Table({tableName:"branches"})
export class Branches extends Model<Branches, BranchesCreationAttribute> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    target_location: string;

    @Column({
        type: DataType.STRING(13),
        allowNull: false,
        unique:true
    })
    phone: string;

    @HasMany(() => Workers)
    workers: Workers[];

    @HasMany(() => Order)
    orders: Order[];

    @HasMany(() => Reviews)
    reviews: Reviews[];

    @HasMany(() => Menu)
    menus: Menu[];

    @HasMany(() => Room)
    rooms: Room[];
}
