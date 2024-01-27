import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import passport from 'passport';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Get ConfigService Instance
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.use(passport.initialize());

  await app.listen(port, async () =>
    console.log(`Server is running 🚀🚀🚀 on:${await app.getUrl()}`)
  );
}
bootstrap();
