import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const responseGql = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    console.log(ctx.getContext().currentUser)
    // currentUser only get properties in schema, but print all properties => JSON parse stringify to get all properties in print
    // return JSON.parse(JSON.stringify(ctx.getContext().currentUser))
    return ctx.getContext().res
  },
)
