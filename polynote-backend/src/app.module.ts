import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middlewares/AuthMiddleware';
import { ListenerModule } from 'src/modules/listener/listener.module';
import { NoteModule } from 'src/modules/note/note.module';
import { UploadModule } from 'src/modules/upload/upload.module';
import { UserModule } from 'src/modules/user/user.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ secret: process.env.PRIVATE_KEY }),

    UserModule,
    NoteModule,
    ListenerModule,
    UploadModule,
    AiModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/api/v1/user/auth',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/user',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/user/(.*)',
          method: RequestMethod.GET,
        },
        {
          path: '/api/v1/notes/shared/(.*)',
          method: RequestMethod.POST,
        },
        {
          path: '/api/v1/ai/make-longer',
          method: RequestMethod.GET,
        },
        {
          path: '/api/v1/ai/summarize',
          method: RequestMethod.GET,
        },
        {
          path: '/api/v1/ai/fix-grammer',
          method: RequestMethod.GET,
        },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
