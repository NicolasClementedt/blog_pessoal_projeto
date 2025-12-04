import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm/browser";
import { TemaService } from "../../tema/services/tema.service";



// postagem service serve para implementar a lógica que vai interagir com o nosso banco de dados




@Injectable() // marca essa classe é de serviço e pode ser "injetada" em outras classes
export class PostagemService {

    
constructor(
@InjectRepository(Postagem) //p// PostagemRepository serve pra executar as interações com o banco de dados
private postagemRepository: Repository<Postagem>, //simbolo <> indica o objeto alvo
private temaService : TemaService                //para ter acesso aos métodos da tema service, fizemos a DIP
// a repository oferece vários métodos prontos como find(), findOne(), save(). Ela é um exemplo da DIP
) {}

async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
        relations:{
        tema: true
    }
});
    
    
}

async findById(id: number): Promise<Postagem> {
const postagem = await this.postagemRepository.findOne({
    where: { id },
    relations:{
        tema: true}
    
});

if(!postagem){
    throw new HttpException ("Postagem não encontrada!", HttpStatus. NOT_FOUND);
}

return postagem;


}


async findAllByTitulo (titulo: string): Promise<Postagem[]>{        // método async retorna lista de postagens cuja atributo título atenda aos critérios da requisição
    return await this.postagemRepository.find({                     //método find da postagemRepository é chamado para executar a consulta no banco de dados
    where: {
        titulo: ILike(`%${titulo}%`)        },       //where igual do MySQL, é para definir um critério. o ILike não diferencia maiúscula de minúscula
relations:{
        tema: true}
    })

}


async create (postagem: Postagem): Promise<Postagem> {       //receber um objeto do tipo postagem e salvar no banco de dados. Objeto postagem foi definido na entity Postagem
    
    await this.temaService.findById(postagem.tema.id)       // verifica se o tema associado a postagem existe
   
    return await this.postagemRepository.save(postagem);       //retorna o objeto e a execução do método save da postagemRepository, o id é criado pelo próprio banco de dados, e a data pelo nest (timestamp)
}       //tudo dando certo retorna a confirmação do objeto persistido no formato JSON


async update (postagem: Postagem): Promise<Postagem> {    //método que promete retornar um objeto da classe postagem que foi atualizado no banco de dados

    await this.findById(postagem.id)      //precisa do id para achar o objeto a ser substituido, 

    await this.temaService.findById(postagem.tema.id)   //verifica se o tema associado a postagem existe

    return await this.postagemRepository.save(postagem); //método save serve tanto para persistir um novo objeto quanto pra atualizar
}


async delete(id: number): Promise<DeleteResult> {      //método async promete retornar uma Promise com um Objeto da Classe DeleteResult
                                    //DeleteResult é uma classe do pacote TypeORM, ele armazena o resultado de uma delete
    await this.findById(id)         //findById é chamado para verificar se a postagem existe

    return await this.postagemRepository.delete(id) //retorna a execução do método delete
}



}