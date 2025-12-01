import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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


}