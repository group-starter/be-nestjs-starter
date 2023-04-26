import { ByUserSchema } from '@/schemas/common.schema'
import mongoose from 'mongoose'

export type TWithSoftDeleted = {
  isDeleted: boolean
  deletedAt: number | null
}

type TDocument = TWithSoftDeleted & mongoose.Document

// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any
}

export const softDeleteFilterPlugin = (schema: mongoose.Schema) => {
  schema.add({
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
      select: false,
    },
    deletedAt: {
      type: Number,
      default: null,
      select: false,
    },
    deletedBy: {
      type: ByUserSchema,
      default: null,
      select: false,
    },
  })

  const typesFindQueryMiddleware = [
    'count',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany',
  ]

  const excludeInFindQueriesIsDeleted = async function (
    this: mongoose.Query<unknown, TDocument>,
    next: HookNextFunction,
  ) {
    this.where({ isDeleted: { $ne: true } })
    next()
  }
  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type as any, excludeInFindQueriesIsDeleted)
  })

  const excludeInDeletedInAggregateMiddleware = async function (
    this: mongoose.Aggregate<any>,
    next: HookNextFunction,
  ) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next()
  }
  schema.pre('aggregate', excludeInDeletedInAggregateMiddleware)
}
