import { Logger } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'
import mongoose from 'mongoose'
import { AppModule, AppModuleForFederation } from './app.module'
import { LoggingInterceptor } from './configs/interceptors/logging.interceptor'
import * as basicAuth from 'express-basic-auth'
import { NestExpressApplication } from '@nestjs/platform-express'
import { RolesGuard } from './configs/guards/roles.guard'

async function bootstrap() {
  // mongoose
  mongoose.set('strictQuery', false)
  const mongoUri = `mongodb://${process.env.DATABASE_HOST || 'localhost'}:${
    process.env.DATABASE_PORT || 27017
  }/${process.env.DATABASE_NAME}`
  await mongoose.connect(mongoUri)

  // ms service
  const appMS = await NestFactory.create(AppModuleForFederation)
  const PORT_MS = process.env.MS_APP_PORT || 3001
  await appMS.listen(PORT_MS)

  // app
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // swagger
  const config = new DocumentBuilder()
    .setTitle('starter V1')
    .setDescription('this BE starter V1')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  app.use(
    ['/docs'],
    basicAuth({
      challenge: true,
      users: { admin: 'supersecret' },
    }),
  )
  SwaggerModule.setup('docs', app, document)

  // interceptor
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalGuards(new RolesGuard(new Reflector()))

  const PORT = process.env.APP_PORT || 3000
  await app.listen(PORT)
  Logger.log(`app MS start in ${PORT_MS}`)
  Logger.log(`app start in ${PORT}`)
}
bootstrap()
