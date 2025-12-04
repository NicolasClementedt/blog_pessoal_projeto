import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';

//Chamado de Decorator no Nest
//Decorator = Etiqueta de Metadados
@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'db_blogpessoal',
  entities: [Postagem, Tema],
  synchronize: true,
  logging: true,
}),
PostagemModule,
TemaModule

  ],
  controllers:[],
  providers:[],
})
export class AppModule {}
