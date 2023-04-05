import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { UploadService } from '@/modules/upload/upload.service'
import { CurrentUser } from '@/configs/paramsDecorators/currentUser.paramDecorator'

@Resolver()
export class UploadResolver {
  constructor(private uploadService: UploadService) {}

  @Mutation()
  async singleUpload(@Args() args, @CurrentUser() currentUser) {
    this.uploadService.singleUpload(args.file, currentUser)
  }
}
