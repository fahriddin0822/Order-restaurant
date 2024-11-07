import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpWorkerDto } from '../workers/dto';
import { SignInWorkerDto } from './dto/sign-in.dto';
import { Response, Request } from 'express';
import { SignUpUserDto } from '../users/dto/signup-worker.dto';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private jwtService: JwtService) { }

    @Post('signup')
    async signUpWorker(@Body() signUpWorkerDto: SignUpWorkerDto, @Res() res: Response) {
        const tokens = await this.authService.signUp(signUpWorkerDto);
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
        return res.json(tokens);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signInWorker(@Body() signInWorkerDto: SignInWorkerDto, @Res() res: Response) {
        const tokens = await this.authService.signIn(signInWorkerDto);
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
        return res.json(tokens);
    }

    @Post('refresh')
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refreshToken'];
        const newTokens = await this.authService.refreshToken(refreshToken);
        res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });
        return res.json(newTokens);
    }

    @Post('signout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refreshToken'];
        await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
    }

    // ===========

    @Post('user/signup')
    async signUpUser(@Body() signUpUserDto: SignUpUserDto, @Res() res: Response) {
        const tokens = await this.authService.signUpUser(signUpUserDto);
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
        return res.json(tokens);
    }

    @HttpCode(HttpStatus.OK)
    @Post('user/signin')
    async signInUser(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
        const tokens = await this.authService.signInUser(signInUserDto);
        res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
        return res.json(tokens);
    }

    @Post('user/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token found');
        }

        const newTokens = await this.authService.refreshTokenUser(refreshToken);
        res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });

        return res.json(newTokens);
    }

    @Post('user/signout')
    @HttpCode(HttpStatus.OK)
    async signOutUser(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) throw new BadRequestException('No refresh token provided');

        await this.authService.signOutUser(refreshToken);

        res.clearCookie('refreshToken');
        return res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
    }

}
