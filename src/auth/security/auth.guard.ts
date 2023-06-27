import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // NestAuthGuard 클래스를 상속받아 JWT 인증 가드를 구현하는 클래스
    return super.canActivate(context);
    // 부모 클래스의 canActivate 메서드를 호출하여 JWT 인증을 수행함
  }
}