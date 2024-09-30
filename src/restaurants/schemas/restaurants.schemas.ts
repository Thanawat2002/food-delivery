import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantsDocument = Restaurants & Document;

@Schema({ timestamps: true })
export class Restaurants {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  orderItems: object[];
}

export const RestaurantsSchema = SchemaFactory.createForClass(Restaurants);
