import { softDeleteFilterPlugin } from '@/configs/mongoose/softDelete.plugin'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { BaseSchema, softDelete, softDeletes } from './common.schema'

export type UserDocument = HydratedDocument<UserSchemaClass>
@Schema({
  collection: 'users',
  versionKey: false,
})
export class UserSchemaClass extends BaseSchema {
  @Prop({
    type: String,
  })
  firstName: string

  @Prop({
    type: String,
  })
  lastName: string

  @Prop({
    type: String,
  })
  fullName: string

  @Prop({
    type: String,
  })
  username: string

  @Prop({
    type: String,
  })
  password: string
}

const UserSchema = SchemaFactory.createForClass(UserSchemaClass)

UserSchema.plugin(softDeleteFilterPlugin)

UserSchema.statics.softDeletes = softDeletes
UserSchema.statics.softDelete = softDelete

export { UserSchema }

export const UserSchemaMongo = new mongoose.Schema({
  _id: String,
  fullName: String,
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
})
