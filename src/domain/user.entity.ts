import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthority } from "./user-authority.entity";


// TypeORM에서 제공하는 데코레이터를 사용하여 User 엔티티를 정의합니다.
@Entity('user')
export class User {
    // PrimaryGeneratedColumn 데코레이터를 사용하여 id 필드를 기본 키로 설정합니다.
    @PrimaryGeneratedColumn()
    id: number;

    // Column 데코레이터를 사용하여 username 필드를 정의합니다.
    @Column()
    username: string;

    // Column 데코레이터를 사용하여 password 필드를 정의합니다.
    @Column()
    password: string;

    // OneToMany 데코레이터를 사용하여 UserAuthority 엔티티와의 일대다 관계를 정의합니다.
    // UserAuthority 엔티티의 user 필드와 매핑됩니다.
    // eager 옵션을 true로 설정하여 User 엔티티를 가져올 때 자동으로 authorities 필드도 함께 가져옵니다.
    @OneToMany(type => UserAuthority, userAuthority => userAuthority.user, { eager: true })
    authorities?: any[];
}
