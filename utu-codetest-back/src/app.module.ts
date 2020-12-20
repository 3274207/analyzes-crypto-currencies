import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [
    ExchangeModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    MongooseModule.forRoot('mongodb://localhost')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
