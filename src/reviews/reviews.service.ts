import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reviews } from './schemas/review.schema';
import { NotFoundError } from 'rxjs';

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

  async remove(id: number): Promise<string> {
    const result = await this.reviewModel.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundException(`Review with ${id}-ID was not found.`);
    }

    return `Review with ${id}-ID deleted successfully.`;
  }

}
