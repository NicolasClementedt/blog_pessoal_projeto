import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.services";
import { Postagem } from "../entities/postagem.entity";


// classe postagem controller é uma camada de controle que lida com as requisições, respostas, verbos e status HTTP
@Controller("/postagens")                //indica que a classe é uma controller
export class PostagemController {
constructor(private readonly postagemService: PostagemService) {}

@Get()                                 // indica qual o verbo HTTP
@HttpCode(HttpStatus.OK)              // monta a resposta HTTP com o status 200
findAll (): Promise<Postagem[]> {
    return this.postagemService.findAll();

}

@Get('/:id')        // indica o verbo HTTP get e com o ("/:id") dá uma rota para a requisição procurar no endpoint
@HttpCode(HttpStatus.OK) // define o código 200 como sucesso padrão
findbyId(@Param('id', ParseIntPipe) id: number ): Promise<Postagem> {     // captura o id na url, id foi definido pelo @param
return this.postagemService.findById(id)                                       //ParseIntPipe garante que o valor de id seja tratado como number inteiro
}           // todos os id devem estar escritos do exato mesmo jeito, senão gera erro 404


@Get('/titulo/:titulo') //mapeia as requisições http enviadas para o endpoint que forem desse tipo
@HttpCode(HttpStatus.OK) //define 200 como sucesso
findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{ //promise de um array de postagens definidos pelo @param('titulo'). O param extrai o valor da URL insere no método
    return this.postagemService.findAllByTitulo(titulo);
}


@Post() //decorator @Post() define que o método Create(@Body()) será encarregado de processar requisições HTTP do tipo POST
@HttpCode(HttpStatus.CREATED)       // código 201 é o sucesso. O endereço do endpoint do create é igual do do findAll, mas como o verbo HTTP é diferente, pode usar o mesmo endereço
Create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);

}


@Put()      //decorador @Put() mapeia todas as requisições HTTP PUT enviadas para o endpoint
@HttpCode(HttpStatus.OK)                                    //@Body acessa o Body no corpo da requisição e insere no Objeto do método Update
update(@Body() postagem: Postagem): Promise<Postagem> {     //método update @Body promete retornar uma Promise com um Objeto Postagem atualizado
    return this.postagemService.update(postagem);
}


@Delete('/:id')     //mapeia todas as requisições HTTP DELETE enviadas para o endereço para o endpoint
@HttpCode(HttpStatus.NO_CONTENT)    //resposta de sucesso é o código 204 NO_CONTENT
delete(@Param('id', ParseIntPipe) id: number) { //De novo o ParseIntPipe, ele converte o id string em um id number Int
    return this.postagemService.delete(id);
}


}