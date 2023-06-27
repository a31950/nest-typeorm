import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // TypeORM에서 엔티티를 정의할 때는 @Entity() 데코레이터를 사용합니다.
export class Cat {
    @PrimaryGeneratedColumn() // 기본 키를 생성하는 열을 정의합니다.
    id: number;

    @Column() // 열을 정의합니다.
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;
}