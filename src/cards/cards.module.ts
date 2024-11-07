import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cards } from './schemas/card.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[SequelizeModule.forFeature([Cards]),UsersModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
