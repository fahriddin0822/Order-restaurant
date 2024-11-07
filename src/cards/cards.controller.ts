import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Roles } from '../../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { SelfGuard } from '../guards/self.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

// @Roles("SUPERADMIN", "MANAGER")
// @UseGuards(RolesGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post('create')
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get('all')
  findAll() {
    return this.cardsService.findAll();
  }

  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.cardsService.findOne(+id);
  }

  @Get('number/:number')
  findByNumber(@Param('number') number: number) {
    return this.cardsService.findByNumber(number);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.cardsService.remove(+id);
  }
}
