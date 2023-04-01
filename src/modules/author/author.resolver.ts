import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

import { PostService } from '@/modules/post/post.service'
import { AuthorService } from '@/modules/author/author.service'

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorService,
    private postsService: PostService,
  ) {}

  @Query()
  async author(@Args('id') id: string) {
    return this.authorsService.findOneById(id)
  }

  @Query()
  async authors() {
    return this.authorsService.findAll()
  }

  @Mutation()
  async createAuthor(@Args() args) {
    return this.authorsService.create(args.newAuth)
  }

  @ResolveField()
  async posts(@Parent() author) {
    const { id } = author
    return null
  }
}
