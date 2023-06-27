import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../../domain/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    // Reflector 서비스를 주입하는 생성자
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // CanActivate 인터페이스를 구현하는 메서드
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // Reflector 서비스를 사용하여 핸들러 메서드에서 roles 메타데이터를 가져옴

    if (!roles) {
      // 만약 핸들러 메서드에 roles 메타데이터가 없다면 접근을 허용함
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // ExecutionContext에서 HTTP 요청 객체를 가져옴
    const user = request.user as User;
    // 요청에서 사용자 객체를 가져와 User 타입으로 캐스팅함

    return user && user.authorities && user.authorities.some(role => roles.includes(role));
    // 사용자가 필요한 역할을 가지고 있는지 확인하여 리소스에 접근할 수 있는지 여부를 반환함
  }
}
