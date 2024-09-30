import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModal: Model<ProductDocument>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const result = new this.productModal(createProductDto);
    return result.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModal.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModal.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const result = this.productModal
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
      })
      .exec();
    return result;
  }

  async remove(id: string) {
    try {
      const result = await this.productModal.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('Could not find the product');
      } else {
        return { message: 'Deleted successful' };
      }
    } catch (error) {
      throw error;
    }
  }
}
