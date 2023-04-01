import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'

export function authFieldDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0]
      if (authDirective) {
        const { requireRole } = authDirective
        if (requireRole) {
          const { resolve = defaultFieldResolver } = fieldConfig
          fieldConfig.resolve = function (source, args, context, info) {
            const currentUser = context.currentUser
            if (!currentUser.roles?.includes(requireRole)) {
              if (_fieldName === 'votes') {
                console.log(info)
                source[_fieldName] = 0
              } else {
                source[_fieldName] = 'not authorized'
              }
            }
            return resolve(source, args, context, info)
          }
          return fieldConfig
        }
      }
    },
  })
}
