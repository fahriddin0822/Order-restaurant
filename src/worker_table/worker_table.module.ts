import { Module } from '@nestjs/common';
import { WorkerTableService } from './worker_table.service';
import { WorkerTableController } from './worker_table.controller';

@Module({
  controllers: [WorkerTableController],
  providers: [WorkerTableService],
})
export class WorkerTableModule {}
