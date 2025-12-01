import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.services";
import { Postagem } from "../entities/postagem.entity";

@Controller("/postagens")                //indica que a classe é uma controller
export class PostagemController {

constructor(private readonly postagemService: PostagemService) {}

@Get()                                 // indica qual tipo de requisição esse método é executado
@HttpCode(HttpStatus.OK)              // monta a resposta HTTP com o status 200
findAll (): Promise<Postagem[]> {
    return this.postagemService.findAll();

}

}