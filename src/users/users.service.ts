import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './schemas/user.schema';
import { SignUpUserDto } from './dto/signup-worker.dto';
import { UniqueConstraintError } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private usersModel: typeof Users) { }

  async create(signUpUserDto: SignUpUserDto): Promise<Users> {
    try {
      const newUser = await this.usersModel.create({
        ...signUpUserDto,
        phone: `+${signUpUserDto.phone}`,
        additional_phone: `+${signUpUserDto.additional_phone}`,
        hashed_password: signUpUserDto.password,
      });
      return newUser;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException("User with this phone number already exists.");
      }
      throw new InternalServerErrorException("An unexpected error occurred.");
    }
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    await this.usersModel.update(
      { hashed_refresh_token: refreshToken },
      { where: { id: userId } },
    );
  }


  async findAll(): Promise<Users[]> {
    return this.usersModel.findAll({ include: { all: true } });
  }


  async findOne(id: number): Promise<Users> {
    const user = await this.usersModel.findByPk(id, { include: { all: true } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.findOne(id);
    await user.update(updateUserDto);
    return user;
  }

  async remove(id: number): Promise<number> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return this.usersModel.destroy({ where: { id } });
  }

  async findByPhoneNumber(phone: string): Promise<Users> {
    return this.usersModel.findOne({ where: { phone: `+${phone}` } });
  }
}
