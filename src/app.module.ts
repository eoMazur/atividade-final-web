import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MateriasModule } from './materias/materias.module';
import { TurmasModule } from './turmas/turmas.module';

@Module({
  imports: [UsuariosModule, MateriasModule, TurmasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
