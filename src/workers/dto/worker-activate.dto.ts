import { IsInt } from "class-validator";


export class ActivateWorkerDto {
    @IsInt()
    readonly workerId: number;
}