import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity";

@Entity({ name: "tb_postagens" }) // indica que é uma entidade, converte em tabela
export class Postagem {

@PrimaryGeneratedColumn() //chave primária com auto increment automático
    id: number;

@IsNotEmpty() // Validador de objeto
@Column({ length: 100, nullable: false }) //Lenght = define o tamanho máximo. Regra NOT NULL do MySQL
    titulo: string

@IsNotEmpty() // Validador de objeto
@Column({ length: 1000, nullable: false }) //Lenght = define o tamanho máximo. Regra NOT NULL do MySQL
    texto: string

@UpdateDateColumn()
    data: Date

@ManyToOne(() => Tema, (tema) => tema.postagem, {   //indica que a Classe Postagem é o lado muitos da relação e terá um Objeto da Classe Tema, chamado tema que é a FOREIGN KEY na tb_postagens(temaId)
    onDelete: "CASCADE" //signifca que quando um Objeto da Classe Tema for apagado, os Objetos da Classe Postagem ligados a esse Tema também serão apagados, o inverso não acontece
}) //conceito de cascatear evita Objeto Órfão, porque eles não têm sentido próprio
tema: Tema //cria um Objeto Tema na entidade atual onde será criada uma chave estrangeira (FK) no banco de dados


}