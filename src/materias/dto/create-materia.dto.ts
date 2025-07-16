import { IsNumber, IsString } from "class-validator";

export class CreateMateriaDto {

    @IsString()
    nome: string

    @IsString()
    descricao: string
}
