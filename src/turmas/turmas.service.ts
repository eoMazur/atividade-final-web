import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AdicionarAlunoTurmaDto } from './dto/adicionar-aluno-turma.dto';
import { MateriaTurmaDto } from './dto/materia-turma.dto';

@Injectable()
export class TurmasService {

  constructor(private readonly prisma: PrismaService, 
    private readonly usuariosService: UsuariosService
  ){}

  async create(createTurmaDto: CreateTurmaDto) {

    await this.verificarfuncaoProfessor(createTurmaDto.professorId);

    return this.prisma.turmas.create({
      data: createTurmaDto,
    });
  }

  async adicionarAluno(idTurma: number, adicionarAlunoTurmaDto: AdicionarAlunoTurmaDto) {
    await this.verificarfuncaoAluno(adicionarAlunoTurmaDto.alunoId);

    return this.prisma.turmas.update({
      where: {
        id: idTurma
      },
      data: {
        alunos: {
          connect: [
            {id: adicionarAlunoTurmaDto.alunoId}
          ]
        }
      }
    })
  }

  async adicionarMateria(idTurma: number, materiaTurmaDto: MateriaTurmaDto) {
    

    return this.prisma.turmas.update({
      where: {
        id: idTurma
      },
      data: {
        materias: {
          create: [
            {materiasId: materiaTurmaDto.materiaId}
          ]
        }
      }
    })
  }

  

  async findAll() {
    return this.prisma.turmas.findMany({
      include: {
        alunos: {
          select: {
            id: true,
            nome: true
          }
        },
        materias: {
          select: {
            materias: {
              select: {
                id: true,
                nome: true
              }
            }
          }
        }
      }
    });
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
      throw new BadRequestException("O usuário professor deve ter função de professor.");
    }
  }

  private async verificarfuncaoAluno(idAluno: number){

    const aluno = await this.usuariosService.findOne(idAluno);

    if(aluno.funcao != 1){
      throw new BadRequestException("O usuário aluno deve ter função de aluno.");
    }
  }
}
