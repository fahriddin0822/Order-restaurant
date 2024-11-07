import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    example: 'Admin',
  })
  @IsNotEmpty({ message: 'Role name is required.' })
  @IsString({ message: 'Role name must be a string.' })
  @Length(3, 20, { message: 'Role name must be between 3 and 20 characters.' })
  name: string;

  @ApiProperty({
    description: 'Description of the role',
    example: 'Administrator with full permissions',
    required: false,
  })
  @IsString({ message: 'Description must be a string.' })
  @MaxLength(100, { message: 'Description cannot exceed 100 characters.' })
  description: string;
}
