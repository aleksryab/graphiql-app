import { useEffect, useState, useRef } from 'react';
import {
  SchemaInterface,
  SchemaTypeInterface,
  TypeArgumentInterface,
  TypeFieldInterface,
} from './DocumentationInterfaces';
import TypeInfo from './TypeInfo';
import getTypeName from './helpers/getTypeName';
import DocField from './DocField';
import './Documentation.scss';

interface DocumentationProps {
  schema: SchemaInterface;
}

const Documentation = ({ schema }: DocumentationProps) => {
  const [queryType, setQueryType] = useState<SchemaTypeInterface>();
  const [activeQuery, setActiveQuery] = useState<TypeFieldInterface | null>(null);
  const [typeInfo, setTypeInfo] = useState<SchemaTypeInterface | null>(null);
  const [activeField, setActiveField] = useState<TypeFieldInterface | TypeArgumentInterface | null>(
    null
  );
  const history = useRef<(TypeFieldInterface | TypeArgumentInterface)[]>([]);

  useEffect(() => {
    if (schema) {
      setQueryType(schema.__schema.types.find((type) => type.name === 'Query'));
    }
  }, [schema]);

  useEffect(() => {
    if (!activeField) return;
    const name = getTypeName(activeField.type);
    setTypeInfo((schema && schema.__schema.types.find((type) => type.name === name)) ?? null);
  }, [schema, activeField]);

  const changeQuery = (field: TypeFieldInterface) => {
    history.current = [field];
    setActiveQuery(field);
    setActiveField(field);
  };

  const changeField = (field: TypeFieldInterface | TypeArgumentInterface) => {
    if (activeField) history.current.push(activeField);
    setActiveField(field);
  };

  const handleBackHistory = () => {
    const current = history.current.pop();
    if (current) setActiveField(current);
  };

  return (
    <div className="documentation">
      <h2>Query:</h2>
      <div className="documentationInfo">
        <ul className="doc-queries">
          {queryType?.fields?.map((field) => (
            <li
              className={`doc-queries__item${activeQuery === field ? ' active' : ''}`}
              key={field.name}
              onClick={() => changeQuery(field)}
            >
              <DocField field={field} />
              <i>{field.description} </i>
            </li>
          ))}
        </ul>
        {typeInfo && activeField && (
          <TypeInfo
            type={typeInfo}
            args={'args' in activeField ? activeField.args : null}
            history={history.current}
            findType={changeField}
            historyBack={handleBackHistory}
            closeTypeInfo={() => setActiveField(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Documentation;
