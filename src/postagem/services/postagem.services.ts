import { Injectable, Type } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() // Indica que essa classe é de serviço e pode ser "injetada" em outras classes
export class PostagemService {

    // iniciando ferramentas para a classe de serviço
constructor(
@InjectRepository(Postagem) //pode chamar os métodos de uma classe repository
private postagemRepository: Repository<Postagem> //simbolo <> indica a tabela alvo

) {}

async findAll(): Promise<Postagem[]> {

    return await this.postagemRepository.find()
}


}