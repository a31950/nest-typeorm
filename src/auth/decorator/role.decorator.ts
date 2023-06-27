import { SetMetadata } from "@nestjs/common"
import { RoleType } from "../role-type"

/**
 * Roles 데코레이터는 해당 엔드포인트에 접근할 수 있는 역할을 지정합니다.
 * @param roles 엔드포인트에 접근할 수 있는 역할의 배열입니다.
 */
export const Roles = (...roles: RoleType[]): any => SetMetadata('roles', roles);
