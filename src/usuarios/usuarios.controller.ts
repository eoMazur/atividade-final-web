import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuariosDto } from './dto/create-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';
import { ParamId } from '../decorators/param-id.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuariosDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@ParamId() id: number, @Body() updateUsuarioDto: UpdateUsuariosDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.usuariosService.remove(+id);
  }
}
