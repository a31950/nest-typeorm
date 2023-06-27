export interface Payload {
    id: number;
    username: string;
    authorities?: any[];
    // JWT 토큰의 페이로드에 대한 인터페이스
    // id: 사용자 ID
    // username: 사용자 이름
    // authorities: 사용자 권한 (선택적)
  }