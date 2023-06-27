/**
 * AuthController 클래스의 유닛 테스트입니다.
 * Test.createTestingModule() 함수를 사용하여 테스트 모듈을 생성합니다.
 * controllers 배열에 AuthController를 추가합니다.
 * module.get() 함수를 사용하여 AuthController 인스턴스를 가져옵니다.
 * it() 함수를 사용하여 테스트 케이스를 정의합니다.
 * controller가 정의되어 있는지 확인합니다.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
