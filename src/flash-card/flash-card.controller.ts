import { Body, Controller, Post } from '@nestjs/common';
import { FlashCardService } from './flash-card.service';
import { FlashCard, FlashCardFolder } from './schemas/flashCardFolder.Schema';

@Controller('flash-card')
export class FlashCardController {
    constructor(private flashCardService: FlashCardService){}

    @Post('create-flashCard-folder')
    async createFlashCardFolder(
        @Body()
        FlashCardFolder
        ): Promise<FlashCardFolder> {
       return this.flashCardService.createFolder(FlashCardFolder)
    }

    @Post('create-flash-card')
    async createFlashCard(
        @Body()
        FlashCard
        ): Promise<FlashCard> {
      
       return this.flashCardService.createCard(FlashCard)
    }
}
