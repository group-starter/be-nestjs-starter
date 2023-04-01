import { SubscriptionConfig } from '@nestjs/graphql'
import { Logger, UnauthorizedException } from '@nestjs/common'

export const subscriptionConfigs: SubscriptionConfig = {
  'graphql-ws': {
    onConnect: (context: any) => {
      const { extra } = context
      // user validation will remain the same as in the example above
      // when using with graphql-ws, additional context value should be stored in the extra field
      const currentUser = {
        _id: 'currentUser socket',
      }
      if (!currentUser) {
        throw new UnauthorizedException()
      }
      extra.currentUser = currentUser
      Logger.log(
        `user: ${JSON.stringify({ _id: currentUser._id })} onConnect`,
        'Subscription',
      )
    },
    onDisconnect(context, code, reason) {
      const { currentUser } = context.extra as { currentUser: any }

      Logger.log(
        `user: ${JSON.stringify({
          _id: currentUser._id,
        })} onDisconnect, code: ${code}, reason: ${reason}`,
        'Subscription',
      )
    },
  },
}
