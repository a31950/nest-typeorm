/**
 * 사용자 역할을 정의하는 열거형입니다.
 * @enum {string}
 */
export enum RoleType {
    /**
     * 제한된 권한을 가진 사용자 역할을 나타냅니다.
     */
    USER = 'ROLE_USER',
    /**
     * 모든 권한을 가진 관리자 역할을 나타냅니다.
     */
    ADMIN = 'ROLE_ADMIN',
  }