import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Roles("SUPERADMIN")
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }


  @Get('all')
  findAll() {
    return this.branchesService.findAll();
  }

  @Roles("SUPERADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.branchesService.findOne(+id);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a Branch by ID' })
  @ApiResponse({ status: 200, description: 'The Branch has been successfully deleted.', schema: { example: { message: "Branch with {id}-ID deleted successfully." } } })
  async remove(@Param('id', ParseIntPipe) id: string): Promise<{ message: string }> {
    const message = await this.branchesService.remove(+id);
    return { message };
  }
}
