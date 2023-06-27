import { Repository } from "typeorm";
import { User } from "../../domain/user.entity";
import { CustomRepository } from "../typeorm.decorator";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  // TypeORM의 Repository 클래스를 상속받아 UserRepository 클래스를 정의함
}
