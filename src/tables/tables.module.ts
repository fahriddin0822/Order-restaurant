import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tables } from './schemas/table.schema';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [SequelizeModule.forFeature([Tables]),
    RoomsModule],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule { }
