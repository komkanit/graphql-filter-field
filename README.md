# graphql-filter-field
filter any field on Schema not just root field

## Install
```
yarn add graphql-filter-field
```
## Usage

`filterFields` passes through all GraphQL type.
``` javascript
import { filterFields } from 'graphql-filter-field'
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
```

Using with [schema transform](https://www.apollographql.com/docs/graphql-tools/schema-transforms.html)

``` javascript
import { withFilterFields } from 'graphql-filter-field'
const transformedSchema = transformSchema(schema, [
  new RenameTypes((name) => `Simple_${name}`),
  withFilterFields((field) => {
    return field.name.endsWith('_delete')
  })
])
```