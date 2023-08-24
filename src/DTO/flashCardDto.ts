import { IsNotEmpty } from 'class-validator'

export class FlashCardDto {

    @IsNotEmpty()
    readonly front : string;

    @IsNotEmpty()
    readonly back : string

    @IsNotEmpty()
    readonly folderId : string

    @IsNotEmpty()
    readonly created_by : string
}