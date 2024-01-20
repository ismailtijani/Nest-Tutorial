import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './middleware/auth';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './posts/post.module';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Profile } from './profile/entities/profile.entity';
import { Post } from './posts/entities/post.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? './env/.prod.env'
          : './env/.dev.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Profile, Post],
        synchronize: true,
        // dropSchema: true,
      }),
    }),
    AuthModule,
    UsersModule,
    ProfileModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // For a specific Http Method
      // .forRoutes({ path: 'users', method: RequestMethod.GET });
      //Apply middleware to a specific route
      // .forRoutes('users');
      //Exclude certain routes from having the middleware applied
      .exclude({ path: 'users', method: RequestMethod.POST })
      //Apply middleware to a specific controller
      .forRoutes(UsersController);
  }
}
