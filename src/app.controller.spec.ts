// NestJS에서 제공하는 TestingModule과 관련된 모듈을 import합니다.
import { Test, TestingModule } from '@nestjs/testing';

// AppController와 AppService를 import합니다.
import { AppController } from './app.controller';
import { AppService } from './app.service';

// AppController 클래스의 유닛 테스트를 정의합니다.
describe('AppController', () => {
  let appController: AppController;

  // beforeEach 함수를 사용하여 테스트 실행 전에 모듈을 생성하고 AppController 인스턴스를 가져옵니다.
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // root describe 블록 안에 테스트 케이스를 정의합니다.
  describe('root', () => {
    it('should return "Hello World!"', () => {
      // AppController 인스턴스의 getHello 메서드를 호출하고 반환된 문자열이 "Hello World!!"인지 확인합니다.
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
