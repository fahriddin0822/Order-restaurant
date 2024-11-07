import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branches } from './schemas/branch.schema';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Branches])],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports:[BranchesService]
})
export class BranchesModule { }
