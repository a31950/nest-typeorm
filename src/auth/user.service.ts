import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./repository/user.repository";
import { FindOneOptions } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { User } from "../domain/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  // 주어진 옵션에 따라 사용자를 검색하는 함수입니다.
  async findByFields(options: FindOneOptions<UserDTO>): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  // 사용자 정보를 저장하는 함수입니다.
  async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
    // 사용자 비밀번호를 해싱합니다.
    await this.transformPassword(userDTO);
    console.log(userDTO);
    // 사용자 정보를 저장하고 저장된 사용자 정보를 반환합니다.
    return await this.userRepository.save(userDTO);
  }

  // 사용자 비밀번호를 해싱하는 함수입니다.
  async transformPassword(user: UserDTO): Promise<void> {
    // bcrypt 라이브러리를 사용하여 비밀번호를 해싱합니다.
    user.password = await bcrypt.hash(user.password, 10);
    // Promise.resolve()를 사용하여 void 타입을 반환합니다.
    return Promise.resolve();
  }
}
