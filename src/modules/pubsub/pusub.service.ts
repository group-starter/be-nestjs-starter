import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { PUBSUB_EVENT_NAME } from './constants'

@Injectable()
export class PubSubService {
  public readonly pubsub = new PubSub()

  testSubscription(args, currentUser) {
    console.log({
      args,
    })
    this.pubsub.publish(PUBSUB_EVENT_NAME.TEST, {
      testSubscription: args,
    })
    return true
  }
}
