import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Roles } from '../../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Roles("SUPERADMIN")
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.roomsService.findOne(+id);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.roomsService.remove(+id);
  }
}
