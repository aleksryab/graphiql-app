export interface TypeFieldInterface {
  deprecationReason?: string;
  description: string;
  isDeprecated: boolean;
  name: string;
  args: TypeArgumentInterface[];
  type: TypeDescriptionInterface;
}

export interface TypeArgumentInterface {
  defaultValue: string;
  description: string;
  name: string;
  type: TypeDescriptionInterface;
}

interface TypeDescriptionInterface {
  kind: string;
  name: string;
}

export interface SchemaTypeInterface {
  description: string;
  enumValues: null;
  fields: TypeFieldInterface[];
  kind: string;
  name: string;
}

export interface SchemaInterface {
  __schema: ParsedSchemaInterface;
}

export interface ParsedSchemaInterface {
  types: SchemaTypeInterface[];
  directives: [];
}
