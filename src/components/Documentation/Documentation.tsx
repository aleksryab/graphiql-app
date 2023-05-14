import { useEffect, useState } from 'react';
import { SchemaInterface, SchemaTypeInterface } from './DocumentationInterfaces';
import TypeInfo from './TypeInfo';
import './Documentation.scss';
import getTypeName from './helpers/getTypeName';
import DocField from './DocField';

export interface DocumentationProps {
  schema: SchemaInterface;
}

function Documentation({ schema }: DocumentationProps) {
  const [typeInfo, setTypeInfo] = useState<SchemaTypeInterface | null>(null);
  const [queryType, setQueryType] = useState<SchemaTypeInterface>();
  const [previousTypeInfo, setPreviousTypeInfo] = useState<SchemaTypeInterface | null>(null);

  useEffect(() => {
    if (schema && schema.__schema) {
      setQueryType(schema.__schema.types.find((type) => type.name === 'Query'));
    }
  }, [schema]);

  const findType = (name: string | null) => {
    if (name) {
      setTypeInfo(schema.__schema.types.find((type) => type.name === name) ?? null);
    } else {
      setTypeInfo(null);
    }
    setPreviousTypeInfo(typeInfo);
  };

  return (
    <div className="documentation">
      <h2>Query:</h2>
      <div className="documentationInfo">
        <ul className="doc-queries">
          {queryType?.fields.map((field) => (
            <li
              className="doc-queries__item"
              key={field.name}
              onClick={() => findType(getTypeName(field.type))}
            >
              <DocField field={field} />
              <i>{field.description}</i>
              <hr />
            </li>
          ))}
        </ul>
        {typeInfo && (
          <TypeInfo
            type={typeInfo}
            findType={findType}
            closeTypeInfo={setTypeInfo}
            previousType={previousTypeInfo}
          />
        )}
      </div>
    </div>
  );
}

export default Documentation;
