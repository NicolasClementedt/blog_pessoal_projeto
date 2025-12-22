import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Tema } from "../../temas/entities/tema.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'admin123',
            database: 'db_blogpessoal',
            entities: [Postagem, Tema, Usuario],
            synchronize: true,
    };
  }
}