// src/room/dto/update-room.dto.ts
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomDto {
  @ApiProperty({ example: 'Conference Room A', description: 'Name of the room', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'A spacious conference room', description: 'Description of the room', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, description: 'ID of the branch the room belongs to', required: false })
  @IsOptional()
  @IsInt()
  branchId?: number;

  @ApiProperty({ example: true, description: 'Status of the room (available or not)', required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({ example: 10, description: 'Capacity of the room', required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;
}
