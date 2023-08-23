import { Prop, Schema , SchemaFactory} from '@nestjs/mongoose'

@Schema({
    timestamps: true,
})

export class FlashCardFolder {

    @Prop()
    title: String

    @Prop()
    shareLink: String
}
export const FlashCardFolderSchema = SchemaFactory.createForClass(FlashCardFolder);

@Schema({
    timestamps: true,
})
export class FlashCard {

    @Prop()
    front: String

    @Prop()
    back: String

    @Prop()
    folderId: String
}

export const FlashCardSchema = SchemaFactory.createForClass(FlashCard);