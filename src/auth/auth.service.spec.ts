/**
 * AuthService 테스트 코드입니다.
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  /**
   * 각 테스트 케이스 실행 전에 실행되는 함수입니다.
   * TestingModule을 생성하고, AuthService를 providers에 추가한 후, compile합니다.
   * 그리고 module.get() 함수를 사용하여 AuthService 인스턴스를 가져옵니다.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  /**
   * AuthService 인스턴스가 정의되어 있는지 확인하는 테스트 케이스입니다.
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
