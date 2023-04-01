import { UserSchema, UserSchemaClass } from '@/schemas/user.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthResolver } from '@/modules/auth/auth.resolver'
import { AuthService } from '@/modules/auth/auth.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
