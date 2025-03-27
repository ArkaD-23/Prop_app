import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth_service.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
