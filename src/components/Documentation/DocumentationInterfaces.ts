export interface TypeFieldInterface {
  deprecationReason?: string;
  description: string;
  isDeprecated: boolean;
  name: string;
}
export interface SchemaTypeInterface {
  description: string;
  enumValues: null;
  fields: TypeFieldInterface[];
  kind: 'OBJECT';
  name: 'Query';
}

export interface SchemaInterface {
  __schema: ParsedSchemaInterface;
}

export interface ParsedSchemaInterface {
  types: SchemaTypeInterface[];
  directives: [];
}
