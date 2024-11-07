import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../../users/schemas/user.schema";

interface CardCreationAttribute{
    name:string;
    holder_full_name:string;
    number:number;
    given_date:string;
    expiration_date:string;
    userId:number;
}

@Table({tableName:"cards"})
export class Cards extends Model<Cards, CardCreationAttribute>{
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
    name:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    holder_full_name:string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    number:number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    given_date:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    expiration_date:string;

    @ForeignKey(()=>Users)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId:number;

    @BelongsTo(()=>Users)
    user:Users;
}
