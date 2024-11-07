import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meal } from './schemas/meal.schema';

@Module({
  imports: [SequelizeModule.forFeature([Meal])],
  controllers: [MealsController],
  providers: [MealsService],
  exports:[MealsService]
})
export class MealsModule {}
