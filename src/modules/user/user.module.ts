import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserSchema, UserSchemaClass } from '@/schemas/user.schema'

import { UserService } from '@/modules/user/user.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
