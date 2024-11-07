// src/review/dto/update-review.dto.ts
import { IsOptional, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
    @ApiProperty({ example: 1, description: 'ID of the user', required: false })
    @IsOptional()
    @IsInt()
    userId?: number;

    @ApiProperty({ example: 2, description: 'ID of the branch being reviewed', required: false })
    @IsOptional()
    @IsInt()
    branchId?: number;

    @ApiProperty({ example: 'Updated review text.', description: 'Text of the review', required: false })
    @IsOptional()
    @IsString()
    review_text?: string;
}
