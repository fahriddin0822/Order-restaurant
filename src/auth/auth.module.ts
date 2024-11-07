import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WorkersModule } from '../workers/workers.module';
import * as dotenv from 'dotenv'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
dotenv.config()

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: process.env.JWT_TIME
            }
        }),
        WorkersModule,
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule { }
