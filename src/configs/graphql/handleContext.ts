import { UserSchemaMongo } from '@/schemas/user.schema'
import { GraphQLError } from 'graphql'
import mongoose from 'mongoose'
import { JWTServiceInstance } from '../jwt'

export const handleContext = async ({ req, extra, res: resContext }) => {
  let currentUser = {}
  try {
    if (
      req.body.query.includes('login(argsLogin:') ||
      req.body.query.includes('query IntrospectionQuery') ||
      req.body.query.includes('__ApolloGetServiceDefinition__') ||
      req.body.operationName === 'SingleUpload'
    ) {
      return {
        res: resContext,
      }
    }

    if (req) {
      const res = await JWTServiceInstance.verifyPromise(
        req.headers.authorization,
      )
      // for graphql normal req
      const userModel = mongoose.model('users', UserSchemaMongo)
      currentUser = await userModel.findById(res._id).lean()
      if (!currentUser) {
        throw '!currentUser'
      }
    } else {
      // for subscription
      currentUser = extra?.currentUser
    }
  } catch (err) {
    console.log(`error handleContext: ${err.message || err}`)
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }

  return {
    currentUser,
    res: resContext,
  }
}
