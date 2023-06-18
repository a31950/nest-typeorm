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

    @Post('/register')
    @UsePipes(ValidationPipe)
    async registerAccount(@Body() UserDTO: UserDTO): Promise<any>{
        return await this.authService.registerUser(UserDTO);
    }

    @Post('/login')
    async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any>{
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
        return res.json(jwt);
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request): any {
        const user: any = req.user;
        return user;
    }
      
    @Get('/admin-role')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    adminRoleCheck(@Req() req:Request): any{
        const user: any = req.user;
        return user;
    }

}
