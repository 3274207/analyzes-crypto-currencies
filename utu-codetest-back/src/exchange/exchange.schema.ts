import * as mongoose from 'mongoose';

export const ExchangeSchema = new mongoose.Schema({
  coinName: String,
  exchangeDate: String,
  priceOpen: String,
  priceHigh: String,
  priceLow: String,
  priceClose: String,
  Volume: String,
  marketCap: String,
  
});