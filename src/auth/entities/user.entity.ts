import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Nested Schema
export class Name extends Document {
  @Prop({ required: true })
  first: string;

  @Prop({ required: true })
  last: string;
}

@Schema()
export class User {
  @Prop({ type: Name })
  name: Name;

  @Prop({ required: true, unique: true, set: (value:string)=>value.toLowerCase().trim()})
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default:'https://res.cloudinary.com/ionicimagesbank/image/upload/v1675629518/trainingAssets/default-image-icon-missing-picture-page-vector-40546530_rsdqhb.jpg' })
  image: string;

  @Prop({ required: true })
  role: string;

  
}

export const UserSchema = SchemaFactory.createForClass(User);
