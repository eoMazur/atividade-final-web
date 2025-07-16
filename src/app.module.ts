import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MateriasModule } from './materias/materias.module';

@Module({
  imports: [UsuariosModule, MateriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
