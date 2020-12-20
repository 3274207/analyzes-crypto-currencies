import { Document } from 'mongoose';

export interface Exchange extends Document {
    readonly coinName: String;
    readonly exchangeDate: String;
    readonly priceOpen: String;
    readonly priceHigh: String;
    readonly priceLow: String;
    readonly priceClose: String;
    readonly Volume: String;
    readonly marketCap: String;
}
