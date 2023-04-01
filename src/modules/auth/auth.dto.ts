import { ILogin } from '@/graphql'
import { IsString, NotEquals } from 'class-validator'

export class ILoginDTO extends ILogin {
  @IsString()
  @NotEquals('admin')
  username: string

  @IsString()
  password: string
}
