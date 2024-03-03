import { NestFactory } from '@nestjs/core';

import { SwaggerExModule } from '@extensions';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerExModule.setup(app);

  await app.listen(3000);
}

bootstrap();
