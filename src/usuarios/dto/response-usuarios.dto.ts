import { Exclude } from "class-transformer";

export class ResponseUsuariosDto{
    id: number;
    nome: string;
    email: string;
    funcao: number;
    telefone: string;
    cidade: string;

    @Exclude()
    senha: string;
}