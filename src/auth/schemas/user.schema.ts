import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class CardUser{

    @Prop()
    name: string

    @Prop({unique: [true, 'This email already exist please try new one or sign in']})
    email: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(CardUser);