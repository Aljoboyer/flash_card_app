import { Module } from '@nestjs/common';
import { FlashCardController } from './flash-card.controller';
import { FlashCardService } from './flash-card.service';
import {MongooseModule} from '@nestjs/mongoose'
import { FlashCardFolderSchema, FlashCardSchema } from './schemas/flashCard.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'FlashCardFolder', schema: FlashCardFolderSchema}, 
      {name: 'FlashCard', schema: FlashCardSchema}
    ]),
    
  ],
  controllers: [FlashCardController],
  providers: [FlashCardService]
})
export class FlashCardModule {}
