// src/room/dto/create-room.dto.ts
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  branchId: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity: number;
}
