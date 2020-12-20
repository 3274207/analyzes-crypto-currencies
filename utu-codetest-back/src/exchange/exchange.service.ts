import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exchange } from './interfaces/exchange.interface';
import { filterExtensionDefinitions } from 'graphql-tools';

@Injectable()
export class ExchangeService {
  constructor(@InjectModel('Exchange') private readonly ExchangeModel: Model<Exchange>) {}

  async findAll(): Promise<Exchange[]> {
    return await this.ExchangeModel.find().exec();
  }

  async findDomain(exchangeDate: String): Promise<Exchange[]> {
    //return await this.ExchangeModel.find({exchangeDate: exchangeDate }).exec() ;
    return await this.ExchangeModel.find({
      $or: [{exchangeDate: "2019-12-04"},{exchangeDate: "2019-11-27"},{exchangeDate: "2019-11-04"}]
     }).exec() ;
  }
}