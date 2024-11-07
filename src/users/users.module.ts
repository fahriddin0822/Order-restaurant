import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './schemas/user.schema';

@Module({
  imports:[SequelizeModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
