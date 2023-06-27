import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Payload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // AuthService 서비스를 주입하는 생성자
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'SECRET_KEY',
      // PassportStrategy 클래스를 상속받아 JWT 전략을 구현하는 클래스
      // jwtFromRequest: JWT 토큰을 추출하는 방법을 지정함
      // ignoreExpiration: 만료 시간을 무시할지 여부를 지정함
      // secretOrKey: JWT 토큰을 검증하는 데 사용할 비밀 키
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    // PassportStrategy 클래스에서 validate 메서드를 구현함
    const user = await this.authService.tokenValidateUser(payload);
    // AuthService 서비스를 사용하여 JWT 토큰의 페이로드를 검증함

    if (!user) {
      // 사용자가 없는 경우 UnauthorizedException 예외를 발생시킴
      return done(new UnauthorizedException({ message: 'user does not exist' }), false);
    }

    return done(null, user);
    // 사용자가 있는 경우 사용자 객체를 반환함
  }
}
