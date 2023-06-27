// db/typeorm-ex.module.ts

// NestJS에서 사용하는 DynamicModule과 Provider를 import합니다.
import { DynamicModule, Provider } from "@nestjs/common";
// NestJS에서 TypeORM을 사용할 때 사용하는 getDataSourceToken 함수를 import합니다.
import { getDataSourceToken } from "@nestjs/typeorm";
// TypeORM에서 사용하는 DataSource와 TYPEORM_EX_CUSTOM_REPOSITORY를 import합니다.
import { DataSource } from "typeorm";
import { TYPEORM_EX_CUSTOM_REPOSITORY } from "./typeorm.decorator";

// TypeOrmExModule 클래스를 선언합니다.
export class TypeOrmExModule {
  // forCustomRepository 함수를 선언합니다.
  public static forCustomRepository<T extends new (...args: any[]) => any>(repositories: T[]): DynamicModule {
    // providers 배열을 선언합니다.
    const providers: Provider[] = [];

    // repositories 배열을 순회하며 provider를 추가합니다.
    for (const repository of repositories) {
      // repository에서 TYPEORM_EX_CUSTOM_REPOSITORY 메타데이터를 가져옵니다.
      const entity = Reflect.getMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, repository);

      // entity가 없으면 다음 repository로 넘어갑니다.
      if (!entity) {
        continue;
      }

      // providers 배열에 provider를 추가합니다.
      providers.push({
        // inject에 getDataSourceToken()을 추가합니다.
        inject: [getDataSourceToken()],
        // provide에 repository를 추가합니다.
        provide: repository,
        // useFactory에 함수를 작성합니다.
        useFactory: (dataSource: DataSource): typeof repository => {
          // baseRepository를 생성합니다.
          const baseRepository = dataSource.getRepository<any>(entity);
          // repository를 생성하고 반환합니다.
          return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
        },
      });
    }

    // DynamicModule을 반환합니다.
    return {
      exports: providers,
      module: TypeOrmExModule,
      providers,
    };
  }
}
