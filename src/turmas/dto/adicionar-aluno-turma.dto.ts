import { IsNumber } from "class-validator";

export class AdicionarAlunoTurmaDto {

    @IsNumber()
    alunoId: number
}