import { Controller, Request, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist'

// example types and params for swagger
import { ApiProperty } from '@nestjs/swagger'
import { Body } from '@nestjs/common/decorators'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger/dist/decorators'

class LoginDTO {
  @ApiProperty()
  username: string

  @ApiProperty()
  password: string
}
class LoginResDTO {
  @ApiProperty()
  username: string

  @ApiProperty()
  password: string
}
@ApiBearerAuth()
@Controller('auth')
@ApiTags('Auth')
export class AppController {
  @Post('login')
  @ApiResponse({ type: LoginResDTO })
  async login(@Body() body: LoginDTO) {
    return body
  }
}
