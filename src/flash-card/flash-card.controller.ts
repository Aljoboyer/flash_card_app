import { Body, Controller, Post , Get, Put, Query, UseGuards, Delete} from '@nestjs/common';
import { FlashCardService } from './flash-card.service';
import { FlashCard, FlashCardFolder } from './schemas/flashCard.Schema';
import { ObjectId } from 'mongodb'
import { AuthGuard } from '@nestjs/passport';
import { FlashCardDto } from 'src/DTO/flashCardDto';

@Controller('flash-card')
export class FlashCardController {
    constructor(private flashCardService: FlashCardService){}

    @Post('create-flashCard-folder')
    @UseGuards(AuthGuard())
    async createFlashCardFolder(
        @Body()
        FlashCardFolder
        ): Promise<FlashCardFolder> {
       return this.flashCardService.createFolder(FlashCardFolder)
    }

    @Post('create-flash-card')
    @UseGuards(AuthGuard())
    async createFlashCard(
        @Body()
        FlashCard: FlashCardDto
        ): Promise<FlashCard> {
       return this.flashCardService.createCard(FlashCard)
    }

    @Get('folders')
    async getFolders(
        @Query('id') id: string,
        ): Promise<FlashCardFolder[]> {
       return this.flashCardService.getUserFolders(id)
    }

    @Get('folders-card')
    @UseGuards(AuthGuard())
    async getFoldersCard(
        @Query('id') id: string,
        ): Promise<FlashCard[]> {
       return this.flashCardService.getFoldersCard(id)
    }

    @Get('single-card')
    @UseGuards(AuthGuard())
    async getSingleCard(
        @Query('id') id: ObjectId,
        ): Promise<FlashCard> {
       return this.flashCardService.getSingleCard(id)
    }

    @Put('update-card')
    @UseGuards(AuthGuard())
    async updateCard(
        @Body()
        FlashCard: any
        ) {
       return this.flashCardService.updateCard(FlashCard)
    }

    @Delete('delete-card')
    @UseGuards(AuthGuard())
    async deleteCard(
        @Query('id') id: ObjectId,
        ) {
       return this.flashCardService.deleteCard(id)
    }
}
