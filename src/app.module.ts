import { Module, UseGuards } from '@nestjs/common'

import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

import { AuthorModule } from '@/modules/author/author.module'
import { PostModule } from '@/modules/post/post.module'
import { PubSubModule } from '@/modules/pubsub/pubsub.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UploadModule } from '@/modules/upload/upload.module'
import { GGCloudStoreModule } from '@/modules/ggCloudStore/ggCloudStore.module'

import { GraphqlModule } from '@/configs/graphql/graphql.modules'
import { AppMongooseModule } from '@/configs/mongoose/mongoose.module'
import { GraphqlMSModule } from '@/configs/microservices/graphql-ms.module'

import { ConfigModule } from '@nestjs/config'
import { RolesGuard } from './configs/guards/roles.guard'

const imports = [
  AppMongooseModule,
  AuthModule,
  PubSubModule,
  AuthorModule,
  PostModule,
  UploadModule,
  GGCloudStoreModule,
  ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true,
  }),
]
const controllers = [AppController]

const providers = [AppService]

@Module({
  imports: imports.concat([GraphqlModule]),
  controllers,
  providers,
})
@UseGuards(RolesGuard)
export class AppModule {}

@Module({
  imports: imports.concat([GraphqlMSModule]),
  controllers,
  providers,
})
export class AppModuleForFederation {}
