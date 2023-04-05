import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { authFieldDirectiveTransformer } from '../directives/authField.directive'
import { handleContext } from './handleContext'
import { subscriptionConfigs } from './subscription'
import { GraphQLUpload } from 'graphql-upload'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./src/**/*.graphql'],
      playground: false,
      path: 'graphql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: subscriptionConfigs, // for websocket
      resolvers: {
        Upload: GraphQLUpload,
      },
      csrfPrevention: true,
      formatError: (error) => {
        // console.log(error)
        if (error.extensions.code === 'INTERNAL_SERVER_ERROR') {
          error.message = 'INTERNAL_SERVER_ERROR'
        }
        return error
      },
      context: handleContext,
      transformSchema: (schema) =>
        authFieldDirectiveTransformer(schema, 'authField'),

      cors: {
        credentials: true,
        origin: true,
      },
    }),
  ],
})
export class GraphqlModule {}
