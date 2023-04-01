import { Args, Query, Resolver } from '@nestjs/graphql'

import { AuthService } from '@/modules/auth/auth.service'
import { ILoginDTO } from './auth.dto'
import { CurrentUser } from '@/configs/paramsDecorators/currentUser.paramDecorator'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query()
  async login(@Args('argsLogin') args: ILoginDTO) {
    return this.authService.login(args.username, args.password)
  }

  @Query()
  async getMe(@CurrentUser() currentUser) {
    return currentUser
  }
}
