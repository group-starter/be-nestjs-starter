import { Module } from '@nestjs/common'

import { PostModule } from '@/modules/post/post.module'
import { AuthorsResolver } from '@/modules/author/author.resolver'
import { AuthorService } from '@/modules/author/author.service'

@Module({
  imports: [PostModule],
  providers: [AuthorsResolver, AuthorService],
})
export class AuthorModule {}
