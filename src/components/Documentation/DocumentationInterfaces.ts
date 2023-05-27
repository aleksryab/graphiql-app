export interface TypeFieldInterface {
  deprecationReason?: string;
  description: string;
  isDeprecated: boolean;
  name: string;
  args: TypeArgumentInterface[];
  type: TypeDescriptionInterface;
}

export interface TypeArgumentInterface {
  defaultValue: unknown;
  description: string;
  name: string;
  type: TypeDescriptionInterface;
}

export interface TypeDescriptionInterface {
  kind: KindTypes;
  name: string | null;
  ofType: TypeDescriptionInterface | null;
}

export interface SchemaTypeInterface {
  description: string;
  enumValues: TypeEnumInterface[] | null;
  fields: TypeFieldInterface[] | null;
  inputFields: TypeArgumentInterface[] | null;
  kind: KindTypes;
  name: string;
}

export interface TypeEnumInterface {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string | null;
}

export interface SchemaInterface {
  __schema: ParsedSchemaInterface;
}

export interface ParsedSchemaInterface {
  types: SchemaTypeInterface[];
  queryType: { name: string };
  mutationType: { name: string } | null;
  subscriptionType: { name: string } | null;
  directives: [];
}

export type KindTypes =
  | 'SCALAR'
  | 'OBJECT'
  | 'INTERFACE'
  | 'UNION'
  | 'ENUM'
  | 'INPUT_OBJECT'
  | 'LIST'
  | 'NON_NULL';
