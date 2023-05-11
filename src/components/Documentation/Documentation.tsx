import { useEffect, useState } from 'react';
import { SchemaInterface, SchemaTypeInterface } from './DocumentationInterfaces';
import TypeInfo from './TypeInfo';
import './Documentation.scss';

export interface DocumentationProps {
  schema: SchemaInterface;
}

function Documentation({ schema }: DocumentationProps) {
  const [typeInfo, setTypeInfo] = useState<SchemaTypeInterface | null>(null);
  const [queryType, setQueryType] = useState<SchemaTypeInterface>();

  useEffect(() => {
    if (schema && schema.__schema) {
      setQueryType(schema.__schema.types.find((type) => type.name === 'Query'));
    }
  }, [schema]);

  const findType = (name: string) => {
    const capitalize = name.charAt(0).toUpperCase() + name.slice(1);
    setTypeInfo(schema.__schema.types.find((type) => type.name === capitalize) ?? null);
  };

  return (
    <div className="documentation">
      <h2>Query:</h2>
      <div className="documentationInfo">
        <ul>
          {queryType?.fields.map((type) => (
            <div key={type.name} onClick={() => findType(type.name)}>
              <div key={type.name}>
                <p>
                  Field name: <b>{type.name}</b>
                </p>
                <p>
                  Description: <b>{type.description}</b>
                </p>
                <hr />
              </div>
            </div>
          ))}
        </ul>
        {typeInfo && <TypeInfo type={typeInfo} closeTypeInfo={setTypeInfo} />}
      </div>
    </div>
  );
}

export default Documentation;
