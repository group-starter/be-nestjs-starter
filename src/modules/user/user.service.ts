import { Injectable } from '@nestjs/common'
import { ByUser, User } from '@/graphql'
import { PubSubService } from '../pubsub/pusub.service'
import { PUBSUB_EVENT_NAME } from '../pubsub/constants'
import { InjectModel } from '@nestjs/mongoose'
import { UserDocument, UserSchemaClass } from '@/schemas/user.schema'
import { TModelWithSoftDelete } from '@/schemas/common.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private userModel: TModelWithSoftDelete<UserDocument, UserSchemaClass>,
  ) {}
}
