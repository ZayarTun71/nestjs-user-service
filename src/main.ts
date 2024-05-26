import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
    package: 'user',
    protoPath: join(__dirname, 'protos/user.proto'),
    url:"localhost:5000",
    }
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
