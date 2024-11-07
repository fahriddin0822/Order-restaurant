import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Branches } from '../../branches/schemas/branch.schema';
import { Tables } from '../../tables/schemas/table.schema';

interface RoomCreationAttr {
    name: string;
    description: string;
    branchId: number;
    status: boolean;
    capacity: number;
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

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

    @ForeignKey(()=>Branches)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    branchId: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    status: boolean;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    capacity: number;

    @BelongsTo(()=>Branches)
    branch:Branches;

    @HasMany(()=>Tables)
    tables:Tables[];
}
