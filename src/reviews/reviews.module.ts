import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reviews } from './schemas/review.schema';

@Module({
  imports:[SequelizeModule.forFeature([Reviews])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
