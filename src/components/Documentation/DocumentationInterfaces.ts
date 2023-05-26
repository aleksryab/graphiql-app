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
  enumValues: null;
  fields: TypeFieldInterface[] | null;
  inputFields: TypeArgumentInterface[] | null;
  kind: KindTypes;
  name: string;
}

export interface QueryTypeInterface {
  name: string;
  description: string;
  fields: TypeFieldInterface[];
  inputFields: null;
  enumValues: null;
  kind: 'OBJECT';
}

export interface SchemaInterface {
  __schema: ParsedSchemaInterface;
}

export interface ParsedSchemaInterface {
  types: (SchemaTypeInterface | QueryTypeInterface)[];
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
