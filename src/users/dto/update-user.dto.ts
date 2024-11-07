import { PartialType } from '@nestjs/swagger';
import { SignUpUserDto } from './signup-worker.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
