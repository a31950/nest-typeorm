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

    async registerUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({
            where: { username: newUser.username }
        });
        if (userFind) {
            throw new HttpException('사용된 유저 이름입니다!', HttpStatus.BAD_REQUEST)
        }
        return await this.userService.save(newUser);
    }

    async validateUser(userDTO: UserDTO): Promise<{accessToken: String} | undefined>{
        let userFind: User = await this.userService.findByFields({
            where: { username: userDTO.username}
        });
        // const validatePassword = await bcrypt.compare(userDTO.password, userFind.password);
        // if(!userFind || !validatePassword){
        //     throw new UnauthorizedException('잘못된 사용자 이름입니다.');
        // }
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

    async tokenValidateUser(payload: Payload): Promise<User | undefined> {
        const userFind = await this.userService.findByFields({
            where: { id: payload.id }
        } as FindOneOptions<UserDTO>);
        this.flatAuthorities(userFind);
        return userFind;
    }

    private flatAuthorities(user: any): User{
        if(user && user.authorities){
            const authorities: string[] = [];
            user.authorities.forEach(authority => authorities.push(authority.authorityName));
            user.authorities = authorities;
        }
        return user;
    }

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
