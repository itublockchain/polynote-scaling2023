import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from 'src/config';
import { AuthMiddleware } from 'src/middlewares/AuthMiddleware';
import { NoteModule } from 'src/modules/note/note.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return CONFIG.MYSQL;
      },
    }),
    JwtModule.register({ secret: process.env.PRIVATE_KEY }),

    UserModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'api/v1/user/auth',
        method: RequestMethod.POST,
      })
      .exclude({
        path: 'api/v1/user/:address',
        method: RequestMethod.GET,
      })
      .exclude({
        path: 'api/v1/user',
        method: RequestMethod.POST,
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
