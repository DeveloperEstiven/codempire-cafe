import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EXPIRE_JWT_TIME } from '../constants/etc';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { UserJwtStrategy } from './user-jwt.strategy';

@Module({
  controllers: [UserAuthController],
  providers: [UserAuthService, UserJwtStrategy],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: EXPIRE_JWT_TIME,
      },
    }),
    PassportModule.register({}),
    UserModule,
    ConfigModule,
  ],
})
export class UserAuthModule {}
