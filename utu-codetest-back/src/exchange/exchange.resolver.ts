import { Resolver,  Query, Args} from '@nestjs/graphql';
import { ExchangeService } from './exchange.service';
import { ExchangeType, AnalysisType } from './dto/exchangetype.dto';

@Resolver()
export class ExchangeResolver {
  constructor(
    private readonly ExchangeService : ExchangeService,
  ) {}

  @Query(() => String)
  async hello() {
    return 'have a good day';
  }

  @Query(() => [ExchangeType])
  async exchange() {
    return this.ExchangeService.findAll();
  }

  @Query(() => [ExchangeType])
  async getHistory(@Args('exchangeDate') exchangeDate: String) {
    return this.ExchangeService.findDomain(exchangeDate) ;
  }
}