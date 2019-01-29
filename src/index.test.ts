import test from 'ava'
import { GraphQLObjectType } from 'graphql'
import { makeExecutableSchema, addMockFunctionsToSchema, transformSchema } from 'graphql-tools'
import { filterFields, withFilterFields } from './'

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

test('filter field name end with _delete', (t) => {
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

test('filter field using transformSchema', (t) => {
  const schema = makeExecutableSchema({ typeDefs })
  addMockFunctionsToSchema({ schema })
  const newSchema = transformSchema(schema, [
    withFilterFields((field) => {
      return field.name.endsWith('_delete')
    })
  ])
  const userType = newSchema.getType('User') as GraphQLObjectType<any, any>
  const fields = userType.getFields()
  
  t.is(fields['hello_delete'], undefined)
  t.not(fields['id'], undefined)
  t.not(fields['fullName'], undefined)
})
