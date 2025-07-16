import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MateriasService {

  constructor(private readonly prisma: PrismaService){}

  async create(createMateriaDto: CreateMateriaDto) {
    return this.prisma.materias.create({
      data: createMateriaDto
    });
  }

  async findAll() {
    return this.prisma.materias.findMany({
      include: {
        turmas: {
          select: {
            turmas: {
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
    await this.verificarMaterias(id);

    return this.prisma.materias.findUnique({
      where: {
        id: id
      },
      include: {
        turmas: {
          select: {
            turmas: {
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

  async update(id: number, updateMateriaDto: UpdateMateriaDto) {
    await this.verificarMaterias(id);

    return this.prisma.materias.update({
      where: {
        id: id
      },
      data: updateMateriaDto,
      include: {
        turmas: {
          select: {
            turmas: {
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

  async remove(id: number) {
    await this.verificarMaterias(id);

      await this.prisma.turmasMateriais.deleteMany({
        where: {
          materiasId: id
        }
      });

      return await this.prisma.materias.delete({
      where: {
        id: id
      },
      include: {
        turmas: {
          select: {
            turmas: {
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

  private async verificarMaterias(id: number){
      if(!(await this.prisma.materias.count({
        where: {
          id
        }
      }))){
        throw new NotFoundException(`Essa materia com ${id} não existe`);
      }
  }
}
