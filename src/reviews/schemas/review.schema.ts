import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Branches } from "../../branches/schemas/branch.schema";
import { OneToMany } from "typeorm";
import { Users } from "../../users/schemas/user.schema";

interface ReviewCreationAttr{
    userId:number;
    branchId:number;
    review_text:string;
}

@Table({tableName:"reviews"})
export class Reviews extends Model<Reviews, ReviewCreationAttr> {
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

    @ForeignKey(()=>Branches)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    branchId:number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    review_text:string;

    @BelongsTo(()=>Branches)
    branch:Branches;

    @BelongsTo(()=>Users)
    user:Users;
}


