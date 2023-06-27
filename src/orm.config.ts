// TypeOrmModuleOptions import합니다.
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

// ormConfig 함수를 정의합니다.
function ormConfig(): TypeOrmModuleOptions {

    // 공통으로 사용되는 설정을 commonConf 객체에 할당합니다.
    const commonConf = {
        SYNCRONIZE : false, // DB 스키마 동기화 여부
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'], // 엔티티 파일 경로
        MIGRATIONS: [__dirname + '/migrations/**/*.{.ts,.js'], // 마이그레이션 파일 경로
        MIGRATIONS_RUN: false, // 앱 실행 시 자동으로 마이그레이션 실행 여부
    };

    // ormconfig 객체에 DB 연결 설정을 할당합니다.
    const ormconfig: TypeOrmModuleOptions = {
      type: 'mysql', // DBMS 종류
      host: 'a31950.synology.me', // DB 호스트 주소
      port: 3306, // DB 포트 번호
      username: 'a31950', // DB 계정 이름
      password: '3195', // DB 계정 비밀번호
      database: 'test', // 사용할 DB 이름
      entities: commonConf.ENTITIES, // 엔티티 파일 경로
      synchronize: commonConf.SYNCRONIZE, // DB 스키마 동기화 여부
      logging: true, // 쿼리 로깅 여부
      migrations: commonConf.MIGRATIONS, // 마이그레이션 파일 경로
      migrationsRun: commonConf.MIGRATIONS_RUN // 앱 실행 시 자동으로 마이그레이션 실행 여부
    }

    // ormconfig 객체를 반환합니다.
    return ormconfig;
}

// ormConfig 함수를 export합니다.
export { ormConfig }