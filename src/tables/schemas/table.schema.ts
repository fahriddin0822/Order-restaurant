import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Room } from '../../rooms/schemas/room.schema';
import { Order } from '../../orders/schemas/order.schema';
import { OrderTable } from '../../order_table/schemas/order_table.schema';

interface TableCreationAttributes {
    roomId: number;
    capacity: number;
    is_booked: boolean;
}

@Table({ tableName: "tables" })
export class Tables extends Model<Tables, TableCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roomId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    capacity: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_booked: boolean;

    @BelongsTo(() => Room)
    room: Room;

    @BelongsToMany(() => Order, () => OrderTable)
    orders:Order[]

}
