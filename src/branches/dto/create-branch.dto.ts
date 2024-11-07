import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional, Length } from "class-validator";

export class CreateBranchDto {
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must be a string.' })
    @Length(1, 100, { message: 'Name must be between 1 and 100 characters long.' })
    name: string;

    @IsNotEmpty({ message: 'Location is required.' })
    @IsString({ message: 'Location must be a string.' })
    @Length(1, 100, { message: 'Location must be between 1 and 100 characters long.' })
    location: string;

    @IsNotEmpty({ message: 'Target location is required.' })
    @IsString({ message: 'Target location must be a string.' })
    @Length(1, 100, { message: 'Target location must be between 1 and 100 characters long.' })
    target_location: string;

    @IsNotEmpty({ message: 'Phone number is required.' })
    @IsString({ message: 'Phone number must be a string.' })
    phone: string;
}
