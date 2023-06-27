// NestJS에서 제공하는 Controller 데코레이터와 AppService를 import합니다.
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller 데코레이터를 사용하여 AppController 클래스를 정의합니다.
@Controller()
export class AppController {
  
  // AppService를 주입받는 생성자를 정의합니다.
  constructor(private readonly appService: AppService) {}

  // HTTP GET 요청을 처리하는 getHello 메서드를 정의합니다.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
