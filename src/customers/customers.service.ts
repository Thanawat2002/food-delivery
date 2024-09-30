import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schemas';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const result = new this.customerModel(createCustomerDto);
    return result.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    return this.customerModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const result = this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, {
        new: true,
      })
      .exec();
    return result;
  }

  async remove(id: string) {
    try {
      const result = await this.customerModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('id not found');
      } else {
        return { message: 'Deleted successful' };
      }
    } catch (error) {
      throw error;
    }
  }
}
