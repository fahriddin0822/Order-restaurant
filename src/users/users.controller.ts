import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/signup-worker.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SelfGuard } from '../guards/self.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.', schema: { example: { message: "user with {id}-ID deleted successfully." } } })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
    const message = await this.usersService.remove(+id);
    return { message };
  }
}
