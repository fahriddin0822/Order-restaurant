import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reviews } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews) private reviewModel: typeof Reviews
  ) { }
  create(createReviewDto: CreateReviewDto) {
    return this.reviewModel.create(createReviewDto);
  }

  findAll() {
    return this.reviewModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.reviewModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.reviewModel.update(updateReviewDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.reviewModel.destroy({ where: { id } });
  }
}
