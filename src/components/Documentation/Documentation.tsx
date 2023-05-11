import { useEffect, useState } from 'react';
import {
  ParsedSchemaInterface,
  SchemaInterface,
  SchemaTypeInterface,
} from './DocumentationInterfaces';
import TypeInfo from './TypeInfo';
import './Documentation.scss';

export interface DocumentationProps {
  schema: SchemaInterface;
}

function Documentation({ schema }: DocumentationProps) {
  const [parsedSchema, setParsedSchema] = useState<ParsedSchemaInterface>();
  const [typeInfo, setTypeInfo] = useState<SchemaTypeInterface | null>(null);

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

  const shouldSkipDirective = (name: string) => {
    return !name.startsWith('__');
  };

  return (
    <div className="documentation">
      <h2>Types:</h2>
      <div className="documentationInfo">
        <ul>
          {!parsedSchema ||
            (parsedSchema.types &&
              parsedSchema.types.map((type) => (
                <>
                  {shouldSkipDirective(type.name) && (
                    <li key={type.name} onClick={() => setTypeInfo(type)}>
                      <p>
                        Name: <b>{type.name}</b>
                      </p>
                      <p>
                        Kind: <b>{type.kind}</b>
                      </p>
                      <p>
                        Description: <b>{type.description}</b>
                      </p>
                    </li>
                  )}
                </>
              )))}
        </ul>
        {typeInfo && <TypeInfo type={typeInfo} closeTypeInfo={setTypeInfo} />}
      </div>
    </div>
  );
}

export default Documentation;
