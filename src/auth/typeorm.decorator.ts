// db/typeorm-ex.decorator.ts

// NestJS에서 사용하는 SetMetadata를 import합니다.
import { SetMetadata } from "@nestjs/common";

// TYPEORM_EX_CUSTOM_REPOSITORY 상수를 선언합니다.
export const TYPEORM_EX_CUSTOM_REPOSITORY = "TYPEORM_EX_CUSTOM_REPOSITORY";

// CustomRepository 함수를 선언합니다.
export function CustomRepository(entity: Function): ClassDecorator {
  // SetMetadata 함수를 호출하여, TYPEORM_EX_CUSTOM_REPOSITORY 메타데이터를 설정합니다.
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
