import test from 'ava'
import { GraphQLObjectType } from 'graphql'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { filterFields } from './'

test('filter field name end with _delete', (t) => {
  const typeDefs = `
    type User {
      id: ID
      fullName: String
      hello_delete: String
    }

    type Query {
      users: [User]
    }
  `
  const schema = makeExecutableSchema({ typeDefs })
  addMockFunctionsToSchema({ schema })
  const newSchema = filterFields(schema, (field) => {
    return field.name.endsWith('_delete')
  })
  const userType = newSchema.getType('User') as GraphQLObjectType<any, any>
  const fields = userType.getFields()
  
  t.is(fields['hello_delete'], undefined)
  t.not(fields['id'], undefined)
  t.not(fields['fullName'], undefined)
})
