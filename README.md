# graphql-filter-field
filter any field on Schema not just root field

## Install
```
yarn add graphql-filter-field
```
## Usage

`filterFields` passes through all GraphQL type.
``` javascript
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