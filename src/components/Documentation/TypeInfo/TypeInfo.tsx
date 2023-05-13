import DocField from '../DocField';
import { SchemaTypeInterface } from '../DocumentationInterfaces';
import getTypeName from '../helpers/getTypeName';

export interface TypeInfoProps {
  type: SchemaTypeInterface;
  closeTypeInfo: () => void;
  findType: (name: string | null) => void;
}

function TypeInfo({ type, closeTypeInfo, findType }: TypeInfoProps) {
  return (
    <div className="typeDescription">
      <button onClick={closeTypeInfo}>Close</button>
      <div>
        <h3>TYPE DETAILS</h3>
        <b>{type.name}</b>
        {type.fields?.map((field) => (
          <div
            className="type-info__item"
            key={field.name}
            onClick={() => findType(getTypeName(field.type))}
          >
            <DocField field={field} />
            <hr />
          </div>
        ))}

        {type.description && <p>{type.description}</p>}
      </div>
    </div>
  );
}

export default TypeInfo;
