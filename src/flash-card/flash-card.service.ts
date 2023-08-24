import { Injectable } from '@nestjs/common';
import { FlashCard, FlashCardFolder } from './schemas/flashCard.Schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb'
import { FlashCardDto } from 'src/DTO/flashCardDto';

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

        const generateLink = `${process.env.URL}/flash-card/folders-card?id=${res._id}`
        const addingShareLink = await this.FlashCardFolderModel.updateOne({_id: new ObjectId(res._id)},{ $set: {shareLink: generateLink}} ); 

        return res
    }

    async createCard(card: FlashCardDto): Promise<FlashCard> {
        
        const res = await this.FlashCardModel.create(card)

        return res
    }

    async getUserFolders(userId: string): Promise<FlashCardFolder[]> {
        const res = await this.FlashCardFolderModel.find({created_by: userId})
        const cardCount = await this.FlashCardModel.find({created_by: userId}).count()
      
        return res
    }

    async getFoldersCard(folderId: string): Promise<FlashCard[]> {
        const res = await this.FlashCardModel.find({folderId: folderId})
        return res
    }

    async getSingleCard(cardId: ObjectId): Promise<FlashCard> {
        const res = await this.FlashCardModel.findById({_id: new ObjectId(cardId)})
        return res
    }

    async updateCard(updateCardBody: any) {
        try{
            const {_id , ...updateData} = updateCardBody
            const res = await this.FlashCardModel.updateOne({_id: new ObjectId(_id)},{ $set: updateData} ); 
            return res
        }
        catch{
            return {status: 400, message: 'please provide all update data properly'}
        }
    }

    async deleteCard(id: ObjectId): Promise<Object> {
        const res = await this.FlashCardModel.deleteOne({_id: new ObjectId(id)})
        return {message: 'Deleted Successfully'}
    }
}
