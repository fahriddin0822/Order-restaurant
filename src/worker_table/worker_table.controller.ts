import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WorkerTableService } from './worker_table.service';
import { CreateWorkerTableDto } from './dto/create-worker_table.dto';
import { UpdateWorkerTableDto } from './dto/update-worker_table.dto';

@Controller('worker-table')
export class WorkerTableController {
  constructor(private readonly workerTableService: WorkerTableService) {}

  @Post()
  create(@Body() createWorkerTableDto: CreateWorkerTableDto) {
    return this.workerTableService.create(createWorkerTableDto);
  }

  @Get()
  findAll() {
    return this.workerTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.workerTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateWorkerTableDto: UpdateWorkerTableDto) {
    return this.workerTableService.update(+id, updateWorkerTableDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.workerTableService.remove(+id);
  }
}
