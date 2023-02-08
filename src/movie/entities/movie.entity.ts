import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Movie {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    poster_path: string;

    @Prop({ required: true })
    overview: string;

    @Prop({ required: true })
    release_date: string;

    @Prop({ required: true })
    vote_average: number;

    @Prop({ required: true })
    vote_count: number;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);