import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WorkersService } from '../workers/workers.service';
import * as bcrypt from 'bcryptjs';
import { SignUpWorkerDto } from '../workers/dto';
import { Workers } from '../workers/models/workers.model';
import { SignInWorkerDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { SignUpUserDto } from '../users/dto/signup-worker.dto';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Users } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly workersService: WorkersService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) { }

    async signUp(signUpWorkerDto: SignUpWorkerDto) {
        const candidate = await this.workersService.findByEmail(signUpWorkerDto.email);
        if (candidate) {
            throw new BadRequestException("Worker with this email already exists.");
        }


        const hashedPassword = await bcrypt.hash(signUpWorkerDto.password, 7);
        if (await this.workersService.findByPhoneNumber(signUpWorkerDto.phone)) {
            throw new NotFoundException("Worker with this phone number is exist.");
        }
        const newWorker = await this.workersService.create({ ...signUpWorkerDto, password: hashedPassword });


        const tokens = this.generateTokens(newWorker);

        await this.workersService.updateRefreshToken(newWorker.id, tokens.refreshToken);
        return tokens;
    }

    async signIn(signInWorkerDto: SignInWorkerDto): Promise<{ accessToken: string; refreshToken: string }> {
        const worker = await this.workersService.findByEmail(signInWorkerDto.email);
        if (!worker) throw new UnauthorizedException('Invalid credentials');

        const validPassword = await bcrypt.compare(signInWorkerDto.password, worker.hashed_password);
        if (!validPassword) throw new UnauthorizedException('Invalid credentials');

        const tokens = this.generateTokens(worker);
        await this.workersService.updateRefreshToken(worker.id, tokens.refreshToken);
        return tokens;
    }

    async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            const payload = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_KEY });
            const worker = await this.workersService.findOne(payload.sub);
            if (worker.hashed_refresh_token !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }
            const newTokens = this.generateTokens(worker);
            await this.workersService.updateRefreshToken(worker.id, newTokens.refreshToken);
            return newTokens;
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(refreshToken: string): Promise<void> {
        const payload = this.jwtService.decode(refreshToken);
        await this.workersService.updateRefreshToken(payload.sub, null);
    }

    private generateTokens(worker: Workers): { accessToken: string; refreshToken: string } {
        const roles = worker.roles.map((role) => role.name);
        const payload = {
            sub: worker.id,
            email: worker.email,
            roles: roles
        };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.JWT_TIME
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: process.env.REFRESH_TOKEN_TIME
        });

        return { accessToken, refreshToken };
    }


    //==================================================================================================

    async signUpUser(signUpUserDto: SignUpUserDto) {
        const candidate = await this.usersService.findByPhoneNumber(signUpUserDto.phone);
        console.log(candidate);
        if (candidate) {
            throw new BadRequestException('User with this phone already exists.');
        }

        const hashedPassword = await bcrypt.hash(signUpUserDto.password, 10);
        const newUser = await this.usersService.create({ ...signUpUserDto, password: hashedPassword });
        const tokens = this.generateTokensUser(newUser);

        await this.usersService.updateRefreshToken(newUser.id, tokens.refreshToken);
        return tokens;
    }

    async signInUser(signInUserDto: SignInUserDto): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.usersService.findByPhoneNumber(signInUserDto.phone);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const validPassword = await bcrypt.compare(signInUserDto.password, user.hashed_password);
        if (!validPassword) throw new UnauthorizedException('Invalid credentials');

        const tokens = this.generateTokensUser(user);
        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async refreshTokenUser(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            const payload = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_KEY });
            const worker = await this.usersService.findOne(payload.sub);
            if (worker.hashed_refresh_token !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }
            const newTokens = this.generateTokensUser(worker);
            await this.usersService.updateRefreshToken(worker.id, newTokens.refreshToken);
            return newTokens;
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async signOutUser(refreshToken: string) {
        try {
            const decoded = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_KEY });
            const user = await this.usersService.findOne(decoded.sub);

            if (!user || user.hashed_refresh_token !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            // Clear the refresh token in the database
            await this.usersService.updateRefreshToken(user.id, null);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }

    private(userId: number) {
        const accessToken = this.jwtService.sign({ sub: userId });
        const refreshToken = this.jwtService.sign({ sub: userId });
        return { accessToken, refreshToken };
    }

    private generateTokensUser(user: Users): { accessToken: string; refreshToken: string } {
        const payload = {
            sub: user.id,
            phone: user.phone
        };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.JWT_TIME
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: process.env.REFRESH_TOKEN_TIME
        });

        return { accessToken, refreshToken };
    }
}
