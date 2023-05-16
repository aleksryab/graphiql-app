import { useEffect, useState } from 'react';
import {
  SchemaInterface,
  SchemaTypeInterface,
  TypeArgumentInterface,
} from './DocumentationInterfaces';
import TypeInfo from './TypeInfo';
import './Documentation.scss';
import getTypeName from './helpers/getTypeName';
import DocField from './DocField';
import { apiRequest } from '../../helpers/API';
import { getIntrospectionQuery } from 'graphql/index';

function Documentation() {
  const [typeInfo, setTypeInfo] = useState<SchemaTypeInterface | null>(null);
  const [args, setArgs] = useState<TypeArgumentInterface[] | null>(null);
  const [queryType, setQueryType] = useState<SchemaTypeInterface>();
  const [previousTypeInfo, setPreviousTypeInfo] = useState<SchemaTypeInterface | null>(null);
  const [documentation, setDocumentation] = useState<SchemaInterface>();

  useEffect(() => {
    apiRequest(JSON.stringify({ query: getIntrospectionQuery() }))
      .then((json) => {
        setDocumentation(json.data);
        if (json.data.__schema) {
          setQueryType(
            json.data.__schema.types.find((type: SchemaTypeInterface) => type.name === 'Query')
          );
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const findType = (name: string | null) => {
    if (name) {
      setTypeInfo(
        (documentation && documentation.__schema.types.find((type) => type.name === name)) ?? null
      );
    } else {
      setTypeInfo(null);
      setArgs(null);
    }
    setPreviousTypeInfo(typeInfo);
  };

  useEffect(() => {
    if (typeInfo) {
      const tmpArgs =
        queryType &&
        queryType.fields &&
        queryType.fields.find((type) => type.name === typeInfo.name.toLowerCase());
      setArgs(tmpArgs ? tmpArgs.args : null);
    } else {
      setArgs(null);
    }
  }, [queryType, typeInfo]);

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
            </li>
          ))}
        </ul>
        {typeInfo && (
          <TypeInfo
            type={typeInfo}
            findType={findType}
            closeTypeInfo={setTypeInfo}
            previousType={previousTypeInfo}
            args={args}
          />
        )}
      </div>
    </div>
  );
}

export default Documentation;
