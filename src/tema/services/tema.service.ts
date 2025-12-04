import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

//tema.service tem os a lógica dos métodos e a repository para executar
@Injectable()
export class TemaService {
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
            relations: {        //relations tem como função exibir os Objetos da Classe Postagem que estão relacionados com os Objetos da Classe Temas
                postagem: true             //isso acontece com os métodos findAll, findById e findbyDescricao e quando um Objeto é persistido
            }
        });
    }

    async findById(id: number): Promise<Tema> {

        let tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!tema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return tema;
    }

    async findAllByDescricao(descricao: string): Promise<Tema[]> {
        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        })
    }

    async create(Tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(Tema);
    }

    async update(tema: Tema): Promise<Tema> {

        await this.findById(tema.id);

        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.temaRepository.delete(id);

    }

}