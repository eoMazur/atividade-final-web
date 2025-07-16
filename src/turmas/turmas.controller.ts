import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { ParamId } from '../decorators/param-id.decorator';
import { AdicionarAlunoTurmaDto } from './dto/adicionar-aluno-turma.dto';
import { MateriaTurmaDto } from './dto/materia-turma.dto';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  create(@Body() createTurmaDto: CreateTurmaDto) {
    return this.turmasService.create(createTurmaDto);
  }

  @Post('/adicionarAluno/:id')
  adicionarAluno(@ParamId() idTurma: number , @Body() adicionarAlunoTurmaDto: AdicionarAlunoTurmaDto){ 
    return this.turmasService.adicionarAluno(idTurma, adicionarAlunoTurmaDto);
  }

  @Post('/adicionarMateria/:id')
  adicionarMateria(@ParamId() idTurma: number , @Body() MateriaTurmaDto : MateriaTurmaDto){
    return this.turmasService.adicionarMateria(idTurma, MateriaTurmaDto);
  }

  @Get()
  findAll() {
    return this.turmasService.findAll();
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.turmasService.findOne(+id);
  }

  @Patch(':id')
  update(@ParamId() id: number, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmasService.update(+id, updateTurmaDto);
  }

  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.turmasService.remove(+id);
  }
}
