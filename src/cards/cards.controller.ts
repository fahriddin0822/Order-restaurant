import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { SelfGuard } from '../guards/self.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// @Roles("SUPERADMIN", "MANAGER")
// @UseGuards(RolesGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post('create')
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Get('all')
  findAll() {
    return this.cardsService.findAll();
  }

  
  @UseGuards(JwtAuthGuard)
  @UseGuards(SelfGuard)
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

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a Card by ID' })
  @ApiResponse({ status: 200, description: 'The Card has been successfully deleted.', schema: { example: { message: "Card with {id}-ID deleted successfully." } } })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
    const message = await this.cardsService.remove(+id);
    return { message };
  }
}
