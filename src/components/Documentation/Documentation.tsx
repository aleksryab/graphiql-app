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
  const [mutationType, setMutationType] = useState<SchemaTypeInterface>();
  const [activeQuery, setActiveQuery] = useState<TypeFieldInterface | null>(null);
  const [typeInfo, setTypeInfo] = useState<SchemaTypeInterface | null>(null);
  const [activeField, setActiveField] = useState<TypeFieldInterface | TypeArgumentInterface | null>(
    null
  );
  const history = useRef<(TypeFieldInterface | TypeArgumentInterface)[]>([]);

  useEffect(() => {
    if (schema) {
      setQueryType(
        schema.__schema.types.find((type) => type.name === schema.__schema.queryType.name)
      );
      setMutationType(
        schema.__schema.types.find((type) => type.name === schema.__schema.mutationType?.name)
      );
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
      <div className="documentation__queries">
        <div>
          <h2>Queries:</h2>
          <ul className="doc-list">
            {queryType?.fields?.map((field) => (
              <li
                className={`doc-list__item${activeQuery === field ? ' active' : ''}`}
                key={field.name}
                onClick={() => changeQuery(field)}
              >
                <p>
                  <DocField field={field} />
                </p>
                <p className="doc-list__description">{field.description}</p>
              </li>
            ))}
          </ul>
        </div>
        {mutationType && (
          <div>
            <h2>Mutations:</h2>
            <ul className="doc-list">
              {mutationType?.fields?.map((field) => (
                <li
                  className={`doc-list__item${activeQuery === field ? ' active' : ''}`}
                  key={field.name}
                  onClick={() => changeQuery(field)}
                >
                  <p>
                    <DocField field={field} />
                  </p>
                  <p>{field.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {typeInfo && activeField && (
        <div className="documentation__types">
          <TypeInfo
            type={typeInfo}
            activeField={activeField}
            args={'args' in activeField ? activeField.args : null}
            history={history.current}
            findType={changeField}
            historyBack={handleBackHistory}
            closeTypeInfo={() => setActiveField(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Documentation;
