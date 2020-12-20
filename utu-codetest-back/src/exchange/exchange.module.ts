import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeResolver } from './exchange.resolver';
import { ExchangeSchema } from './exchange.schema';
import { ExchangeService } from './exchange.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Exchange', schema: ExchangeSchema }])],
    providers: [ExchangeResolver, ExchangeService],
})
export class ExchangeModule {}
