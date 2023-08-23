import { Injectable } from '@nestjs/common';
import { FlashCard, FlashCardFolder } from './schemas/flashCardFolder.Schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()

export class FlashCardService {
    constructor(
        @InjectModel(FlashCardFolder.name)
        private  FlashCardFolderModel: mongoose.Model<FlashCardFolder>,

        @InjectModel(FlashCard.name)
        private  FlashCardModel: mongoose.Model<FlashCard>
    ){}

    async createFolder(folder: FlashCardFolder): Promise<FlashCardFolder> {
        const res = await this.FlashCardFolderModel.create(folder)
        return res
    }

    async createCard(card: FlashCard): Promise<FlashCard> {
        console.log('This is body', card)
        const res = await this.FlashCardModel.create(card)
        return res
    }
}
