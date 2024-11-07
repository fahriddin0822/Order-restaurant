import { Controller, Post, Body, Get, Patch, Delete, Param, HttpCode, HttpStatus, ParseIntPipe, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { ApiTags } from '@nestjs/swagger';
import { Workers } from './models/workers.model';
import { AddRemoveRoleDto, SignUpWorkerDto, UpdateWorkerDto } from './dto';
import { ActivateWorkerDto } from './dto/worker-activate.dto';
import { SelfGuard } from '../guards/self.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('workers')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workerService: WorkersService) { }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post("addRole")
  async addRole(@Body() addRemoveRoleDto: AddRemoveRoleDto): Promise<Workers> {
    return this.workerService.addRole(addRemoveRoleDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post("removeRole")
  async removeRole(@Body() addRemoveRoleDto: AddRemoveRoleDto): Promise<Workers> {
    return this.workerService.removeRole(addRemoveRoleDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("activate")
  async activateWorker(@Body() activateWorkerDto: ActivateWorkerDto): Promise<Workers> {
    return this.workerService.activateWorker(activateWorkerDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("deactivate")
  async deactivateWorker(@Body() activateWorkerDto: ActivateWorkerDto): Promise<Workers> {
    return this.workerService.deactivateWorker(activateWorkerDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.workerService.findAll();
  }

  // @Roles("SUPERADMIN")
  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workerService.findOne(id);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('phone/:phone')
  findByPhoneNumber(@Param('phone') phone: string) {
    return this.workerService.findByPhoneNumber(phone);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.workerService.findByEmail(email);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(id, updateWorkerDto);
  }

  @Roles("SUPERADMIN")
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {

    const requesterId = req.user?.sub;
    if (!requesterId) {
      throw new BadRequestException("Requester ID not found.");
    }

    if (id === requesterId) {
      throw new BadRequestException("SUPERADMIN cannot delete themselves.");
    }

    return this.workerService.remove(id);
  }


}
