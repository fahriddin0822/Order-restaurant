import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from "sequelize-typescript";
import { Branches } from "../../branches/schemas/branch.schema";
import { Roles } from "../../roles/schemas/role.schema";
import { WorkersRoles } from "./workers-roles.model";

interface WorkersCreationAttribute {
    email: string;
    hashed_password: string;
    full_name: string;
    role: string;
    branchId:number
    phone_number: string;
}

@Table({ tableName: "workers" })
export class Workers extends Model<Workers, WorkersCreationAttribute> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique:true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    role: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @ForeignKey(()=>Branches)
    @Column({
        type: DataType.INTEGER,
        allowNull:false
    })
    branchId: number;

    @Column({
        type: DataType.STRING(13),
        allowNull: false,
        unique:true
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
      })
      activation_link: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    hashed_refresh_token: string;

    @BelongsTo(()=>Branches)
    branch:Branches;

    @BelongsToMany(()=>Roles, ()=>WorkersRoles)
    roles:Roles[];
}
