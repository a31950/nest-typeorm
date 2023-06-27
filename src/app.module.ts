// NestJS에서 사용되는 Module 데코레이터를 import합니다.
import { Module } from '@nestjs/common';

// 애플리케이션의 Controller 클래스를 import합니다.
import { AppController } from './app.controller';

// 애플리케이션의 Service 클래스를 import합니다.
import { AppService } from './app.service';

// TypeORM을 사용하기 위해 TypeOrmModule을 import합니다.
import { TypeOrmModule } from '@nestjs/typeorm';

// 인증 관련 기능을 제공하는 AuthModule을 import합니다.
import { AuthModule } from './auth/auth.module';

// 데이터베이스 설정을 가져오기 위해 ormConfig 파일을 import합니다.
import { ormConfig } from './orm.config';

// 환경 변수를 로드하기 위해 ConfigModule을 import합니다.
import { ConfigModule } from '@nestjs/config';

// config 파일에서 환경 변수를 가져옵니다.
import config from './config/config';

// AppModule 클래스에 Module 데코레이터를 적용합니다.
@Module({
  // AppModule이 사용할 모듈을 imports 배열에 추가합니다.
  imports: [
    // ConfigModule을 사용하여 환경 변수를 로드합니다.
    ConfigModule.forRoot({
      load: [config],
      isGlobal:true
    }),

    // TypeOrmModule을 사용하여 데이터베이스와 상호작용합니다.
    TypeOrmModule.forRootAsync({useFactory: ormConfig}),

    // AuthModule을 import합니다.
    AuthModule
  ],

  // AppModule이 사용할 Controller 클래스를 controllers 배열에 추가합니다.
  controllers: [AppController],

  // AppModule이 사용할 Service 클래스를 providers 배열에 추가합니다.
  providers: [AppService],
})

// AppModule 클래스를 export합니다.
export class AppModule {}
