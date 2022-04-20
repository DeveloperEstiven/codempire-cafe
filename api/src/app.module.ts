import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './constants/config';
import { IngredientModule } from './ingredient/ingredient.module';
import { MenuModule } from './menu/menu.module';
import { ProductModule } from './product/product.module';
import { DatabaseConfig } from './shared/configs/database.config';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UserModule,
    UserAuthModule,
    IngredientModule,
    ProductModule,
    MenuModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
