import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PostDocument = Post & Document;
export type PostReply = { target: string; message: string; created: Date };

@Schema()
export class Post {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    created: Date;

    @Prop({ type: Array, required: true })
    replies: PostReply[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
