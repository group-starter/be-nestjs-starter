import { softDeleteFilterPlugin } from '@/configs/mongoose/softDelete.plugin'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { BaseSchema, softDelete, softDeletes } from './common.schema'

export type PostDocument = HydratedDocument<PostSchemaClass>
@Schema({
  collection: 'posts',
  versionKey: false,
})
export class PostSchemaClass extends BaseSchema {
  @Prop({
    type: String,
  })
  title: string

  @Prop({
    type: Number,
  })
  votes: number

  @Prop({ type: String })
  authorId: string
}

const PostSchema = SchemaFactory.createForClass(PostSchemaClass)

PostSchema.plugin(softDeleteFilterPlugin)

PostSchema.statics.softDeletes = softDeletes
PostSchema.statics.softDelete = softDelete

export { PostSchema }
