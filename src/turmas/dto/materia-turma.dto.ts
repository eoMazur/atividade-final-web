import { IsNumber } from "class-validator";

export class MateriaTurmaDto {

    @IsNumber()
    materiaId: number
}