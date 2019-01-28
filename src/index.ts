import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLField,
  GraphQLFieldMap
} from 'graphql'

type Filter = (
  field: GraphQLField<any, any, {
    [key: string]: any;
  }>,
  fields: GraphQLFieldMap<any, any>,
  type: GraphQLObjectType<any, any>
) => boolean

function filterFields(schema: GraphQLSchema, filter: Filter) {
  const typeMap = schema.getTypeMap()
  Object.keys(typeMap).forEach((typeName) => {
    const type = typeMap[typeName]
    if (type instanceof GraphQLObjectType && type.name.slice(0, 2) !== '__') {
      const fields = type.getFields()
      Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName]
        if (filter(field, fields, type)) {
          delete fields[fieldName]
        }
      })
    }

  })
  return schema
}

function withFilterFields (filter: Filter) {
  return {
    transformSchema(schema: GraphQLSchema) {
      return filterFields(schema, filter)
    }
  }
}

export {
  filterFields,
  withFilterFields
}
