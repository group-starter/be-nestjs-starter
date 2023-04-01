import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { uuid } from 'uuidv4'

@Schema()
export class ByUser {
  @Prop({
    type: String,
  })
  _id: string

  @Prop({
    type: String,
  })
  fullName: string
}
export const ByUserSchema = SchemaFactory.createForClass(ByUser)

@Schema()
export class BaseSchema {
  @Prop({
    type: String,
    default: uuid,
  })
  _id: string

  @Prop({
    type: Number,
    default: +new Date(),
    select: false,
  })
  createdAt: number

  @Prop({
    type: ByUserSchema,
    select: false,
  })
  createdBy: ByUser

  @Prop({
    type: Number,
    default: +new Date(),
    select: false,
  })
  updatedAt: number

  @Prop({
    type: ByUserSchema,
    default: null,
    select: false,
  })
  updatedBy?: ByUser
}

export const softDeletes = async <TModelDocument>(
  model: Model<TModelDocument>,
  query: FilterQuery<TModelDocument>,
  byUser: ByUser,
) => {
  return await model.updateMany(query, {
    $set: {
      isDeleted: true,
      deletedAt: +new Date(),
      byUser,
    },
  })
}

export const softDelete = async <TModelDocument>(
  model: Model<TModelDocument>,
  query: FilterQuery<TModelDocument>,
  byUser: ByUser,
) => {
  return await model.findByIdAndUpdate(
    query,
    {
      $set: {
        isDeleted: true,
        deletedAt: +new Date(),
        byUser,
      },
    },
    {
      new: true,
    },
  )
}

export type TModelWithSoftDelete<TDocument, TSchemaClass> = Model<TDocument> & {
  softDeletes: (
    model: Model<TDocument>,
    filter: FilterQuery<TSchemaClass>,
    byUser: ByUser,
  ) => void
}
