import { readFileSync } from "fs";
import * as yaml from 'js-yaml';
import {join} from 'path';

// YAML 설정 파일 이름 정의
const YAML_CONFIG_PROD = 'production.yaml';
const YAML_CONFIG_DEV = 'development.yaml';

// NODE_ENV 환경 변수에 따라 적절한 YAML 설정 파일을 로드하는 함수를 내보냅니다.
export default () => {
  return yaml.load(
    // NODE_ENV 환경 변수에 따라 어떤 설정 파일을 로드할지 결정하는 삼항 연산자 사용
    (process.env.NODE_ENV === 'prod')
      ? readFileSync(join(__dirname, YAML_CONFIG_PROD), 'utf8') // production.yaml 파일을 로드합니다.
      : readFileSync(join(__dirname, YAML_CONFIG_DEV), 'utf8') // development.yaml 파일을 로드합니다.
  ) as Record<string, any>; // 로드한 YAML 파일을 Record<string, any> 타입으로 캐스팅합니다.
}