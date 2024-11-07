import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './schemas/room.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchesModule } from '../branches/branches.module';

@Module({
  imports: [SequelizeModule.forFeature([Room]),
    BranchesModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports:[RoomsService]
})
export class RoomsModule { }
