/**
 * AuthController는 인증과 관련된 HTTP 요청을 처리하는 컨트롤러입니다.
 */
import { Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe, UsePipes} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';
import { RolesGuard } from './security/roles.guard';
import { RoleType } from './role-type';
import { Roles } from './decorator/role.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    /**
     * POST /auth/register 요청을 처리합니다.
     * UserDTO 객체를 ValidationPipe을 사용하여 검증합니다.
     * AuthService의 registerUser() 함수를 호출하여 새로운 사용자를 등록합니다.
     */
    @Post('/register')
    @UsePipes(ValidationPipe)
    async registerAccount(@Body() UserDTO: UserDTO): Promise<any>{
        return await this.authService.registerUser(UserDTO);
    }

    /**
     * POST /auth/login 요청을 처리합니다.
     * UserDTO 객체를 받아서 AuthService의 validateUser() 함수를 호출하여 사용자를 인증합니다.
     * JWT 토큰을 생성하고, HTTP 응답 헤더에 Authorization 헤더를 추가합니다.
     * JWT 토큰을 HTTP 응답 본문에 추가하여 반환합니다.
     */
    @Post('/login')
    async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any>{
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
        return res.json(jwt);
    }

    /**
     * GET /auth/authenticate 요청을 처리합니다.
     * AuthGuard를 사용하여 인증된 사용자만 접근할 수 있습니다.
     * 현재 인증된 사용자 정보를 반환합니다.
     */
    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request): any {
        const user: any = req.user;
        return user;
    }
      
    /**
     * GET /auth/admin-role 요청을 처리합니다.
     * AuthGuard와 RolesGuard를 사용하여 인증된 사용자 중 ADMIN 권한을 가진 사용자만 접근할 수 있습니다.
     * 현재 인증된 사용자 정보를 반환합니다.
     */
    @Get('/admin-role')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    adminRoleCheck(@Req() req:Request): any{
        const user: any = req.user;
        return user;
    }

}
