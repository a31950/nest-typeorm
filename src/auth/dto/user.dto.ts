import { IsNotEmpty } from "class-validator";

export class UserDTO {
  /**
   * 유저 데이터 전송 객체 클래스입니다.
   * username 필드는 유저 이름을 나타내는 문자열입니다.
   * password 필드는 유저 비밀번호를 나타내는 문자열입니다.
   */
  @IsNotEmpty()
  username: string;

  /**
   * 유저 데이터 전송 객체 클래스입니다.
   * username 필드는 유저 이름을 나타내는 문자열입니다.
   * password 필드는 유저 비밀번호를 나타내는 문자열입니다.
   */
  @IsNotEmpty()
  password: string;
}
