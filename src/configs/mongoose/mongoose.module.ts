import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
  path: path.resolve(process.cwd(), '.env.development'),
})
const mongoUri = `mongodb://${process.env.DATABASE_HOST || 'localhost'}:${
  process.env.DATABASE_PORT || 27017
}/${process.env.DATABASE_NAME}`
@Module({
  imports: [MongooseModule.forRoot(mongoUri)],
})
export class AppMongooseModule {}
