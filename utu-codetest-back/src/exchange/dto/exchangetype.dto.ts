import { Field, ObjectType, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class ExchangeType {
  @Field( () => ID )
  id: String;
  @Field()
  coinName: String;
  @Field()
  exchangeDate: String;
  @Field()
  priceOpen: String;
  @Field()
  priceHigh: String;
  @Field()
  priceLow: String;
  @Field()
  priceClose: String;
  @Field()
  Volume: String;
  @Field()
  marketCap: String;
}

@ObjectType()
export class AnalysisType {
  @Field( () => ID )
  id: String;
  @Field()
  coinName: String;
  @Field( () => Float )
  priceNow: Number;
  @Field( () => Float )
  d1Difference: Number;
  @Field( () => Float )
  d7Difference: Number;
  @Field( () => Float )
  d30Difference: Number;
  @Field( () => Int )
  volume: Number;
  @Field( () => Float )
  cap: Number;
}
