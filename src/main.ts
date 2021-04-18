import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as passport from 'passport';
import * as session from 'express-session';
import cookieParser = require("cookie-parser");



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  });

  app.use(session({
    secret: 'hello-world',
  }));

  app.enableCors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  });

  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT);
}
bootstrap();
