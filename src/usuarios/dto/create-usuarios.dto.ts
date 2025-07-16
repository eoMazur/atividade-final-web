import { IsEmail, IsEnum, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { Funcao } from "../../enums/funcao.enum";

export class CreateUsuariosDto {

    @IsString()
    nome: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0
    })
    senha: string;

    @IsEmail(undefined, {message: "O email deve ser válido"})
    email: string;

    @IsEnum(Funcao)
    funcao: number;

    @IsString()
    @MinLength(13)
    @MaxLength(13)
    telefone: string;

    @IsString()
    cidade: string;

    @IsNumber()
    turmaId: number
}
