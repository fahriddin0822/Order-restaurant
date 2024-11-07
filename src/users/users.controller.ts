import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/signup-worker.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SelfGuard } from '../guards/self.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get('phone/:phone')
  findByPhoneNumber(@Param('phone') phone: string) {
    return this.usersService.findByPhoneNumber(phone);
  }

  @UseGuards(JwtAuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
