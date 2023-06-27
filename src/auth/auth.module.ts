/**
 * AuthModule은 인증과 관련된 기능을 담당하는 모듈입니다.
 */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { TypeOrmExModule } from './typeorm.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UserAuthorityRepository } from './repository/user-authority.repository';

@Module({
  /**
   * TypeOrmExModule을 import합니다.
   * 이 때, UserRepository와 UserAuthorityRepository를 forCustomRepository() 함수의 인자로 전달합니다.
   * JwtModule을 import합니다. 이 때, secret과 signOptions를 설정합니다.
   * PassportModule을 import합니다.
   */
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, UserAuthorityRepository]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '300s' }
    }),
    PassportModule
  ],
  /**
   * TypeOrmExModule을 exports합니다.
   * AuthController, AuthService, UserService, JwtStrategy를 controllers와 providers에 추가합니다.
   */
  exports: [TypeOrmExModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule { }
