// NestJS에서 사용되는 NestFactory와 AppModule을 import합니다.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// NestJS에서 사용되는 ConfigService를 import합니다.
import { ConfigService } from '@nestjs/config';

// bootstrap 함수를 async로 정의합니다.
async function bootstrap() {

  // NestFactory를 사용하여 AppModule을 생성합니다.
  const app = await NestFactory.create(AppModule);

  // ConfigService를 사용하여 configService를 생성합니다.
  const configService = app.get(ConfigService);

  // configService에서 server.port 값을 가져와서 port 변수에 할당합니다.
  const port = configService.get<string>('server.port');

  // app.listen 메서드를 사용하여 해당 포트에서 앱을 실행합니다.
  await app.listen(port);

  // 해당 포트를 이용중임을 console.log로 출력합니다.
  console.log(`해당 포트를 이용중 입니다. : ${port}`);
}

// bootstrap 함수를 실행합니다.
bootstrap();
