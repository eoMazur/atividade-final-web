import { IsNumber, IsString } from "class-validator"

export class CreateTurmaDto {

    @IsString()
    nome: string

    @IsNumber()
    professorId: number
}
