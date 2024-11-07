// src/menu/menu.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Menu } from './schemas/menu.schema';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Roles("SUPERADMIN")
@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({ status: 201, description: 'The menu has been successfully created.', type: Menu })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all menus' })
  @ApiResponse({ status: 200, description: 'Returns an array of menus.', type: [Menu] })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a menu by ID' })
  @ApiResponse({ status: 200, description: 'Returns a single menu.', type: Menu })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu by ID' })
  @ApiResponse({ status: 200, description: 'The menu has been successfully updated.', type: Menu })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a menu by ID' })
  @ApiResponse({ status: 204, description: 'The menu has been successfully deleted.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.menuService.remove(id);
  }
}
