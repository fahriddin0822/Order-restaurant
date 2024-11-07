import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Reviews } from "../../reviews/schemas/review.schema";
import { Cards } from "../../cards/schemas/card.schema";
import { Order } from "../../orders/schemas/order.schema";
import { Payment } from "../../payments/schemas/payment.schema";
import { Roles } from "../../roles/schemas/role.schema";

interface UserCreationAttribute{
    full_name: string;
    phone: string;
    hashed_password: string;
    additional_phone: string;
}

@Table({tableName:"users"})
export class Users extends Model<Users, UserCreationAttribute> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    
    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    full_name: string;
    
    @Column({
        type: DataType.STRING(14),
        allowNull: false,
        unique:true
    })
    phone: string;    

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING(14),
        allowNull: false,
    })
    additional_phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_active: boolean;

    @HasMany(()=>Reviews)
    reviews:Reviews[];

    @HasMany(()=>Cards)
    cards:Cards[];

    @HasMany(()=>Order)
    orders:Order[];

    @HasMany(()=>Payment)
    payments:Payment[];
}
