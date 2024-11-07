import { IsNotEmpty, IsString } from 'class-validator';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Users } from '../../users/schemas/user.schema';
import { Workers } from '../../workers/models/workers.model';
import { WorkersRoles } from '../../workers/models/workers-roles.model';

interface RolesCreationAttr {
  name: string;
  description: string;
}


@Table({ tableName: "roles" })
export class Roles extends Model<Roles, RolesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  name: string;

  @Column({
    type: DataType.STRING
  })
  description: string;

  @BelongsToMany(() => Workers, () => WorkersRoles)
  users:Users[];
}
