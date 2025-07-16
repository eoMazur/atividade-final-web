import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class TurmasService {

  constructor(private readonly prisma: PrismaService, 
    private readonly usuariosService: UsuariosService
  ){}

  async create(createTurmaDto: CreateTurmaDto) {

    await this.verificarfuncaoProfessor(createTurmaDto.professorId);

    return this.prisma.turmas.create({
      data: createTurmaDto
    });
  }

  async findAll() {
    return this.prisma.turmas.findMany();
  }

  async findOne(id: number) {
    await this.verificarTurma(id);

    return this.prisma.turmas.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto) {
    await this.verificarTurma(id);

    return this.prisma.turmas.update({
      where: {
        id: id
      },
      data: updateTurmaDto
    });
  }

  async remove(id: number) {
    await this.verificarTurma(id);

    return this.prisma.turmas.delete({
      where: {
        id: id
      }
    });
  }

  private async verificarTurma(id: number){
      if(!(await this.prisma.turmas.count({
        where: {
          id
        }
      }))){
        throw new NotFoundException(`A turma com id ${id} não existe`);
      }
  }

  private async verificarfuncaoProfessor(id: number){

    const professor = await this.usuariosService.findOne(id);

    if(professor.funcao != 2){
      throw new BadRequestException("O usuário professor deve ter cargo de professor.");
    }
  }
}
