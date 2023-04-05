import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    // currentUser only get properties in schema, but print all properties => JSON parse stringify to get all properties in print
    // return JSON.parse(JSON.stringify(ctx.getContext().currentUser))
    return JSON.parse(JSON.stringify(ctx.getContext().currentUser || {}))
  },
)
