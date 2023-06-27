// NestJS에서 사용되는 Injectable 데코레이터를 import합니다.
import { Injectable } from '@nestjs/common';

// AppService 클래스에 Injectable 데코레이터를 적용합니다.
@Injectable()

// AppService 클래스를 export합니다.
export class AppService {

  // getHello 메서드를 정의합니다.
  getHello(): string {
    // 'Hello World!!!' 문자열을 반환합니다.
    return 'Hello World!!!';
  }
}
