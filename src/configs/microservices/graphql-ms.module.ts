import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { handleContext } from '../graphql/handleContext'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./src/**/**/*.graphql'],
      context: handleContext,
      path: 'graphql-ms',
    }),
  ],
})
export class GraphqlMSModule {}
