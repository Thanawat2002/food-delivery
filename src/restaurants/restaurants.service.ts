import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Restaurants,
  RestaurantsDocument,
} from './schemas/restaurants.schemas';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurants.name)
    private restaurantModel: Model<RestaurantsDocument>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurants> {
    const result = new this.restaurantModel(createRestaurantDto);
    return result.save();
  }

  async findAll(): Promise<Restaurants[]> {
    return this.restaurantModel.find().exec();
  }

  async findOne(id: string): Promise<Restaurants> {
    return this.restaurantModel.findById(id).exec();
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurants> {
    const result = this.restaurantModel
      .findByIdAndUpdate(id, updateRestaurantDto, {
        new: true,
      })
      .exec();
    return result;
  }

  async remove(id: string) {
    try {
      const result = await this.restaurantModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('id not found');
      } else {
        return new ApiResponse(200, 'Restaurant deleted successfully', result);
      }
    } catch (error) {
      throw error;
    }
  }
}
