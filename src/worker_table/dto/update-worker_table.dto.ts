import { PartialType } from '@nestjs/swagger';
import { CreateWorkerTableDto } from './create-worker_table.dto';

export class UpdateWorkerTableDto extends PartialType(CreateWorkerTableDto) {}
