import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { PostService } from '@/modules/post/post.service'
import { CurrentUser } from '@/configs/paramsDecorators/currentUser.paramDecorator'
import { Roles } from '@/configs/decorators/roles.decorator'
import { ApiBearerAuth } from '@nestjs/swagger'

@Roles('user')
@Resolver('Post')
@ApiBearerAuth()
export class PostResolver {
  constructor(private postsService: PostService) {}

  @Query()
  async post(@Args('id') id: string) {
    return this.postsService.findOneById(id)
  }

  @Roles('admin')
  @Query()
  async posts(@CurrentUser() currentUser) {
    return this.postsService.findAll()
  }

  @Mutation()
  async createPost(@Args() args, @CurrentUser() currentUser) {
    return this.postsService.create(args.newPost, currentUser)
  }
}
