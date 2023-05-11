import { useEffect, useState } from 'react';

interface DocumentationProps {
  schema: SchemaInterface;
}

interface TypeFieldInterface {
  deprecationReason?: string;
  description: string;
  isDeprecated: boolean;
  name: string;
}
interface SchemaTypeInterface {
  description: string;
  enumValues: null;
  fields: TypeFieldInterface[];
  kind: 'OBJECT';
  name: 'Query';
}

interface SchemaInterface {
  __schema: ParsedSchemaInterface;
}

interface ParsedSchemaInterface {
  types: SchemaTypeInterface[];
  directives: [];
}

function Documentation({ schema }: DocumentationProps) {
  const [parsedSchema, setParsedSchema] = useState<ParsedSchemaInterface>();

  useEffect(() => {
    if (schema && schema.__schema) {
      const types = schema.__schema.types;
      const directives = schema.__schema.directives;

      setParsedSchema({
        types,
        directives,
      });
    }
  }, [schema]);

  return (
    <div>
      <h2>Types:</h2>
      <ul>
        {!parsedSchema ||
          (parsedSchema.types &&
            parsedSchema.types.map((type) => <li key={type.name}>{type.name}</li>))}
      </ul>
    </div>
  );
}

export default Documentation;
