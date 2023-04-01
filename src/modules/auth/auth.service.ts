import { JWTServiceInstance } from '@/configs/jwt'
import { LoginRespose } from '@/graphql'
import { TModelWithSoftDelete } from '@/schemas/common.schema'
import { UserDocument, UserSchemaClass } from '@/schemas/user.schema'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { GraphQLExecutionContext } from '@nestjs/graphql'
import { InjectModel } from '@nestjs/mongoose'
import { uuid } from 'uuidv4'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private userModel: TModelWithSoftDelete<UserDocument, UserSchemaClass>,
  ) {}

  async login(username: string, password: string): Promise<LoginRespose> {
    console.log(username, password)
    const dataUser = await this.userModel
      .findOne({
        username,
      })
      .lean()

    if (!dataUser) {
      throw new UnauthorizedException()
    }
    if (dataUser.password !== password) {
      throw new UnauthorizedException()
    }

    const token = await JWTServiceInstance.signPromise({
      _id: dataUser._id,
      fullName: dataUser.fullName,
    })
    return {
      token,
    }
  }
}
