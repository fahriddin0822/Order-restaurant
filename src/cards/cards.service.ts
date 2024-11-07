import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Cards } from './schemas/card.schema';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../users/schemas/user.schema';
import { where } from 'sequelize';
import { UsersService } from '../users/users.service';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Cards) private cardModel: typeof Cards,
    private userService: UsersService
  ) { }

  async create(createCardDto: CreateCardDto) {
    if(! await this.userService.findOne(createCardDto.userId)){
      throw new NotFoundException("User is not exist.");
    }
    return this.cardModel.create(createCardDto);
  }

  findAll(): Promise<Cards[]> {
    return this.cardModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<Cards> {
    return this.cardModel.findOne({ where: { id }, include: { all: true } });
  }

  findByNumber(number: number): Promise<Cards> {
    return this.cardModel.findOne({ where: { number } });
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Cards> {
    const candidate = this.findOne(id);
    if (!candidate) {
      throw new NotFoundException("Card not found.");
    }
    const card = await this.cardModel.update(updateCardDto, { where: { id }, returning: true });
    return card[1][0];
  }

  remove(id: number) {
    return this.cardModel.destroy({ where: { id } });
  }
}
