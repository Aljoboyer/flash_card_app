import { Module } from '@nestjs/common';
import { FlashCardController } from './flash-card.controller';
import { FlashCardService } from './flash-card.service';
import {MongooseModule} from '@nestjs/mongoose'
import { FlashCardFolderSchema, FlashCardSchema } from './schemas/flashCard.Schema';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {name: 'FlashCardFolder', schema: FlashCardFolderSchema}, 
      {name: 'FlashCard', schema: FlashCardSchema},
    ]),
    ClientsModule.register([
      {
        name: 'FLASHCARD_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://eznvlfwg:iic-sdyDTDaxjyolUg1SfwDG2AbajDDE@rattlesnake.rmq.cloudamqp.com/eznvlfwg'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [FlashCardController],
  providers: [FlashCardService]
})
export class FlashCardModule {}
