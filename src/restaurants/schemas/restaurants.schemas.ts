import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Document } from 'mongoose';

export type RestaurantsDocument = Restaurants & Document;

@Schema()
class OrderItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Restaurants {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [OrderItemSchema], required: true })
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  orderItems: OrderItem[];
}

export const RestaurantsSchema = SchemaFactory.createForClass(Restaurants);
