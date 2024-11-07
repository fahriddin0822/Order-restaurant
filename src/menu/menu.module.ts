import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from './schemas/menu.schema';
import { MealsModule } from '../meals/meals.module';
import { BranchesModule } from '../branches/branches.module';

@Module({
  imports:[SequelizeModule.forFeature([Menu]),MealsModule, BranchesModule],
  controllers: [MenuController],
  providers: [MenuService],

})
export class MenuModule {}
