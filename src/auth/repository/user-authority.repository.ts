import { EntityRepository, Repository } from "typeorm";
import { UserAuthority } from "../../domain/user-authority.entity";

@EntityRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority> {
  // TypeORM의 EntityRepository 클래스를 상속받아 UserAuthorityRepository 클래스를 정의함
}
