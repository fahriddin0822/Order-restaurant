import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from "sequelize-typescript";
import { Workers } from "./workers.model";
import { Roles } from "../../roles/schemas/role.schema";

interface WorkersRolesCreationAttribute {
    workerId:number
    roleId:number
}

@Table({ tableName: "workers_roles" })
export class WorkersRoles extends Model<WorkersRoles, WorkersRolesCreationAttribute> {
    @ForeignKey(()=>Workers)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    workerId:number

    @ForeignKey(()=>Roles)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    roleId:number
}
