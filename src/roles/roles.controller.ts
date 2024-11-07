import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Roles("SUPERADMIN")
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.rolesService.findAll();
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.rolesService.findRoleByName(name);
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.rolesService.findOne(+id);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.rolesService.remove(+id);
  }
}
