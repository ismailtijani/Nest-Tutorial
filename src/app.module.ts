import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
import { AuthMiddleware } from './middleware/auth';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';
import { Post } from './posts/entities/post.entity';
import { PostModule } from './posts/post.module';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT')),
        username: 'root',
        password: 'Isma!lt!jani1',
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Profile, Post],
        synchronize: true,
        // dropSchema: true,
      }),
      inject: [ConfigService],
    }),
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
