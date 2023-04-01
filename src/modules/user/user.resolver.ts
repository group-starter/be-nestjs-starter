import { Resolver } from '@nestjs/graphql'

import { UserService } from '@/modules/user/user.service'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
}
