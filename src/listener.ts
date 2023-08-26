import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://eznvlfwg:iic-sdyDTDaxjyolUg1SfwDG2AbajDDE@rattlesnake.rmq.cloudamqp.com/eznvlfwg'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      });
}
bootstrap();

