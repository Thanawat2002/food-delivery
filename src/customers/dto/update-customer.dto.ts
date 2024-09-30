import { IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly address: string;
  @IsString()
  readonly phone: string;
}
