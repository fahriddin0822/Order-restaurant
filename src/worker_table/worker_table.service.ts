import { Injectable } from '@nestjs/common';
import { CreateWorkerTableDto } from './dto/create-worker_table.dto';
import { UpdateWorkerTableDto } from './dto/update-worker_table.dto';

@Injectable()
export class WorkerTableService {
  create(createWorkerTableDto: CreateWorkerTableDto) {
    return 'This action adds a new workerTable';
  }

  findAll() {
    return `This action returns all workerTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workerTable`;
  }

  update(id: number, updateWorkerTableDto: UpdateWorkerTableDto) {
    return `This action updates a #${id} workerTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} workerTable`;
  }
}
