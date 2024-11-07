import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../../users/schemas/user.schema";

interface PaymentCreationAttr{
    userId:number;
    amount:number;
    is_card:boolean;
}

@Table({tableName:"payments"})
export class Payment extends Model<Payment, PaymentCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(()=>Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId:number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    amount:number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    is_card:boolean;

    @BelongsTo(()=>Users)
    user:Users;
}
