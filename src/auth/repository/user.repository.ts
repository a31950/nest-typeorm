import { Repository } from "typeorm";
import { User } from "../../domain/user.entity";
import { CustomRepository } from "../typeorm.decorator";

@CustomRepository(User)
export class UserRepository extends Repository<User> {}