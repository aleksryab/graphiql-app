import { useEffect, useState, useRef } from 'react';
import {
  SchemaInterface,
  SchemaTypeInterface,
  TypeArgumentInterface,
  TypeFieldInterface,
} from './types';
import './Documentation.scss';
import TypeInfo from './TypeInfo';
import getTypeName from './helpers/getTypeName';
import DocList from './DocList';

interface DocumentationProps {
  schema: SchemaInterface;
}

const Documentation = ({ schema }: DocumentationProps) => {
  const [queryType, setQueryType] = useState<SchemaTypeInterface>();
  const [mutationType, setMutationType] = useState<SchemaTypeInterface>();
  const [subscriptionType, setSubscriptionType] = useState<SchemaTypeInterface>();
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
      setSubscriptionType(
        schema.__schema.types.find((type) => type.name === schema.__schema.subscriptionType?.name)
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

  const findType = (name: string | null) => {
    setTypeInfo((schema && schema.__schema.types.find((type) => type.name === name)) ?? null);
  };

  return (
    <div className="documentation">
      <div className="documentation__queries">
        {queryType && (
          <DocList
            list={queryType}
            activeQuery={activeQuery}
            title="Queries:"
            picQuery={changeQuery}
          />
        )}
        {mutationType && (
          <DocList
            list={mutationType}
            activeQuery={activeQuery}
            title="Mutations:"
            picQuery={changeQuery}
          />
        )}
        {subscriptionType && (
          <DocList
            list={subscriptionType}
            activeQuery={activeQuery}
            title="Subscriptions:"
            picQuery={changeQuery}
          />
        )}
      </div>
      {typeInfo && activeField && (
        <div className="documentation__types">
          <TypeInfo
            type={typeInfo}
            activeField={activeField}
            args={'args' in activeField ? activeField.args : null}
            history={history.current}
            findType={findType}
            pickType={changeField}
            historyBack={handleBackHistory}
            closeTypeInfo={() => setActiveField(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Documentation;
