import { IsObject, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly address: string;
  @IsObject()
  readonly orderItem: object[];
}
