import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpdateTableDto {
    @IsOptional()
    @IsNumber()
    roomId?: number;

    @IsOptional()
    @IsNumber()
    capacity?: number;

    @IsOptional()
    @IsBoolean()
    is_booked?: boolean;
}