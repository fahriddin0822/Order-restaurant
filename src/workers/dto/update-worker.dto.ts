import { PartialType } from '@nestjs/mapped-types';
import { SignUpWorkerDto } from './signup-worker.dto';

export class UpdateWorkerDto extends PartialType(SignUpWorkerDto) {}
