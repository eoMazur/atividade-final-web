import { Exclude } from "class-transformer";

export class ResponseUsuarioDto{
    id: number;
    nome: string;
    email: string;
    funcao: number;
    telefone: string;
    cidade: string;

    @Exclude()
    senha: string;
}