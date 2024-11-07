import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Tables } from "../../tables/schemas/table.schema";
import { Order } from "../../orders/schemas/order.schema";

interface OrderTableCreationAttrinute {
    tableId: number;
    orderId: number;
}

@Table({tableName:"order_table"})
export class OrderTable extends Model<OrderTable, OrderTableCreationAttrinute> {
    @ForeignKey(() => Tables)
    @Column({ type: DataType.INTEGER })
    tableId: number;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    orderId: number;

    @BelongsTo(() => Tables)
    tale: Tables;

    @BelongsTo(() => Order)
    order: Order;
}
