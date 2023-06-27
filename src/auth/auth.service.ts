import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/user.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    /**
     * 새로운 사용자를 등록합니다.
     * @param {UserDTO} newUser - 등록할 사용자 정보
     * @returns {Promise<UserDTO>} - 등록된 사용자 정보
     * @throws {HttpException} - 이미 사용 중인 사용자 이름일 경우 예외 발생
     */
    async registerUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({
            where: { username: newUser.username }
        });
        if (userFind) {
            throw new HttpException('사용된 유저 이름입니다!', HttpStatus.BAD_REQUEST)
        }
        return await this.userService.save(newUser);
    }

    /**
     * 사용자 정보를 검증하고, 인증된 사용자의 액세스 토큰을 반환합니다.
     * @param {UserDTO} userDTO - 검증할 사용자 정보
     * @returns {Promise<{accessToken: String} | undefined>} - 인증된 사용자의 액세스 토큰
     * @throws {UnauthorizedException} - 잘못된 사용자 이름 또는 인증되지 않은 패스워드일 경우 예외 발생
     */
    async validateUser(userDTO: UserDTO): Promise<{accessToken: String} | undefined>{
        let userFind: User = await this.userService.findByFields({
            where: { username: userDTO.username}
        });
        if(!userFind){
            throw new UnauthorizedException('잘못된 사용자 이름입니다.');
        }
        const validatePassword = await bcrypt.compare(userDTO.password, userFind.password);
        if(!validatePassword){
            throw new UnauthorizedException('인증되지 않은 패스워드입니다.');
        }
        this.convertInAuthorities(userFind);
        const payLoad: Payload = { 
            id: userFind.id, 
            username: userFind.username, 
            authorities: userFind.authorities
        };
        return {
            accessToken : this.jwtService.sign(payLoad)
        };
    }

    /**
     * 액세스 토큰을 사용하여 사용자 정보를 검증합니다.
     * @param {Payload} payload - 검증할 액세스 토큰의 페이로드
     * @returns {Promise<User | undefined>} - 검증된 사용자 정보
     */
    async tokenValidateUser(payload: Payload): Promise<User | undefined> {
        const userFind = await this.userService.findByFields({
            where: { id: payload.id }
        } as FindOneOptions<UserDTO>);
        this.flatAuthorities(userFind);
        return userFind;
    }

    /**
     * 사용자 정보에서 authorities 배열을 평면화합니다.
     * @param {any} user - authorities 배열을 평면화할 사용자 정보
     * @returns {User} - authorities 배열이 평면화된 사용자 정보
     */
    private flatAuthorities(user: any): User{
        if(user && user.authorities){
            const authorities: string[] = [];
            user.authorities.forEach(authority => authorities.push(authority.authorityName));
            user.authorities = authorities;
        }
        return user;
    }

    /**
     * 사용자 정보에서 authorities 배열을 변환합니다.
     * @param {any} user - authorities 배열을 변환할 사용자 정보
     * @returns {User} - authorities 배열이 변환된 사용자 정보
     */
    private convertInAuthorities(user: any): User {
        if(user && user.authorities){
            const authorities: any[] = [];
            user.authorities.forEach(authority => {
                authorities.push({name: authority.authorityName});
            });
            user.authorities = authorities;
        }
        return user;
    }
}
