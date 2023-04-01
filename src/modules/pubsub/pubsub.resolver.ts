import {
  Args,
  Context,
  Mutation,
  Resolver,
  Subscription,
} from '@nestjs/graphql'

import { PubSubService } from '@/modules/pubsub/pusub.service'
import { PUBSUB_EVENT_NAME } from './constants'
import { Post } from '@/graphql'
import { CurrentUser } from '@/configs/paramsDecorators/currentUser.paramDecorator'

@Resolver()
export class PubSubResolver {
  constructor(private pubSubService: PubSubService) {}

  @Subscription(() => Post, {
    // start after publish
    filter: (payload, varriable, context) => {
      console.log('filter Subscription')
      return true
    },
    // start after filter
    resolve: (payload, args, context, info) => {
      console.log('resolve Subscription', { payload })
      return payload
    },
  })
  connectSubscription(@Args() args) {
    return this.pubSubService.pubsub.asyncIterator(PUBSUB_EVENT_NAME.TEST)
  }

  @Mutation()
  async testSubscription(@Args() args, @CurrentUser() currentUser) {
    return this.pubSubService.testSubscription(args, currentUser)
  }
}
