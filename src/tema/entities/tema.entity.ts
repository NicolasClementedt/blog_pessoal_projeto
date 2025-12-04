import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity({name: "tb_temas"}) //decorator @Entity marcar a classe como uma entidade
export class Tema {

    @PrimaryGeneratedColumn() //define a primary key
        id: number

    @IsNotEmpty() //marca para não ser nulo
    @Column({length: 255, nullable: false}) //define a coluna como varchar 255 caracteres
    descricao: string
   

@OneToMany(() => Postagem, (postagem) => postagem.tema) //indica que a Classe Tema é o lado 1 da relação e terá um array de Objetos da Classe Postagem
postagem: Postagem[] //será criado um array de Objetos da Classe Postagem
    
   
}
