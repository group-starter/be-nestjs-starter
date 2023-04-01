import { Module } from '@nestjs/common'

import { PostResolver } from '@/modules/post/post.resolver'
import { PostService } from '@/modules/post/post.service'
import { AuthModule } from '../auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { PostSchema, PostSchemaClass } from '@/schemas/post.schema'

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: PostSchemaClass.name, schema: PostSchema },
    ]),
  ],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
