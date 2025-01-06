import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.MATH_SERVICE_HOST,
        port: +process.env.MATH_SERVICE_HOST || 3001, // Microservice listens on this port
      },
    }
  );

  await app.listen();
}
bootstrap();
