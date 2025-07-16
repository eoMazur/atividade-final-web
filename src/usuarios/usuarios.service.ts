import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseUsuarioDto } from './dto/response-usuario.dto';

@Injectable()
export class UsuariosService {

  constructor(private readonly prisma: PrismaService){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    
    return this.prisma.usuario.create({
      data: createUsuarioDto
    })
  }

  async findAll() {
    const usuarios = this.prisma.usuario.findMany();

    return (await usuarios).map(usuario => {
      return plainToInstance(ResponseUsuarioDto, usuario);
    })
  }

  async findOne(id: number) {
    await this.verificarUsuario(id);

    const usuario = this.prisma.usuario.findUnique({
      where: {
        id: id
      }
    })

    return plainToInstance(ResponseUsuarioDto, usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.verificarUsuario(id);

    return this.prisma.usuario.update({
      data: {
        nome: updateUsuarioDto.nome,
        cidade: updateUsuarioDto.cidade,
        email: updateUsuarioDto.email,
        funcao: updateUsuarioDto.funcao,
        telefone: updateUsuarioDto.telefone
      },
      where: {
        id: id
      }
    });

  }

  async remove(id: number) {
    await this.verificarUsuario(id);

    return this.prisma.usuario.delete({
      where: {
        id: id
      }
    });
  }

  private async verificarUsuario(id: number){
    if(!(await this.prisma.usuario.count({
      where: {
        id
      }
    }))){
      throw new NotFoundException(`Usuário com ${id} não existe`);
    }
  }
}
