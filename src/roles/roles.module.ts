import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './schemas/role.schema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([ Roles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService],
})
export class RolesModule {}
