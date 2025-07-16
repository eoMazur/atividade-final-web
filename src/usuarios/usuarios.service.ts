import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuariosDto } from './dto/create-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseUsuariosDto } from './dto/response-usuarios.dto';

@Injectable()
export class UsuariosService {

  constructor(private readonly prisma: PrismaService){}

  async create(createUsuariosDto: CreateUsuariosDto) {
    
    return this.prisma.usuarios.create({
      data: createUsuariosDto
    })
  }

  async findAll() {
    const usuarios = this.prisma.usuarios.findMany();

    return (await usuarios).map(usuario => {
      return plainToInstance(ResponseUsuariosDto, usuario);
    })
  }

  async findOne(id: number) {
    await this.verificarUsuario(id);

    const usuario = await this.prisma.usuarios.findUnique({
      where: {
        id
      }
    })

    return plainToInstance(ResponseUsuariosDto, usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuariosDto) {
    await this.verificarUsuario(id);

    return this.prisma.usuarios.update({
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

    return this.prisma.usuarios.delete({
      where: {
        id: id
      }
    });
  }

  private async verificarUsuario(id: number){
    if(!(await this.prisma.usuarios.count({
      where: {
        id
      }
    }))){
      throw new NotFoundException(`Usuário com ${id} não existe`);
    }
  }
}
