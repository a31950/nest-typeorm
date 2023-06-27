import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

// TypeORM에서 제공하는 데코레이터를 사용하여 UserAuthority 엔티티를 정의합니다.
@Entity('user_authority')
export class UserAuthority {
    // PrimaryGeneratedColumn 데코레이터를 사용하여 id 필드를 기본 키로 설정합니다.
    @PrimaryGeneratedColumn()
    id: number;

    // Column 데코레이터를 사용하여 userId 필드를 정의합니다.
    // 'user_id'라는 이름으로 데이터베이스에 저장됩니다.
    @Column('int', {name: 'user_id'})
    userId: number;

    // Column 데코레이터를 사용하여 authorityName 필드를 정의합니다.
    // 'authority_name'이라는 이름으로 데이터베이스에 저장됩니다.
    @Column('varchar', {name: 'authority_name'})
    authorityName: string;

    // ManyToOne 데코레이터를 사용하여 User 엔티티와의 다대일 관계를 정의합니다.
    // User 엔티티의 authorities 필드와 매핑됩니다.
    @ManyToOne(type => User, user => user.authorities)
    @JoinColumn({name: 'user_id'})
    user: User;
}
