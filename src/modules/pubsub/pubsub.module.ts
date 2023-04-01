import { Module } from '@nestjs/common'
import { PubSubResolver } from './pubsub.resolver'
import { PubSubService } from './pusub.service'

@Module({
  providers: [PubSubService, PubSubResolver],
  exports: [PubSubService],
})
export class PubSubModule {}
