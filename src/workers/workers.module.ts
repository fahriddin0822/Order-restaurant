import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { Workers } from './models/workers.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkersRoles } from './models/workers-roles.model';
import { Roles } from '../roles/schemas/role.schema';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Workers, WorkersRoles, Roles]),
    RolesModule,
  ],
  controllers: [WorkersController],
  providers: [WorkersService],
  exports: [WorkersService]
})
export class WorkersModule { }
