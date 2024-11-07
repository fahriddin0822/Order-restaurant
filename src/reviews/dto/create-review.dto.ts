// src/review/dto/create-review.dto.ts
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({ example: 1, description: 'ID of the user' })
    @IsInt()
    userId: number;

    @ApiProperty({ example: 2, description: 'ID of the branch being reviewed' })
    @IsInt()
    branchId: number;

    @ApiProperty({ example: 'Great service!', description: 'Text of the review' })
    @IsString()
    review_text: string;
}
