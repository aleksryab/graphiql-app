import DocField from '../DocField';
import { SchemaTypeInterface, TypeArgumentInterface } from '../DocumentationInterfaces';
import getTypeName from '../helpers/getTypeName';
import Arguments from '../Arguments';

export interface TypeInfoProps {
  type: SchemaTypeInterface;
  previousType: SchemaTypeInterface | null;
  closeTypeInfo: (typeInfo: SchemaTypeInterface | null) => void;
  findType: (name: string | null) => void;
  args: TypeArgumentInterface[] | null;
}

function TypeInfo({ type, previousType, closeTypeInfo, findType, args }: TypeInfoProps) {
  return (
    <div className="typeDescription">
      <button onClick={() => closeTypeInfo(null)}>Close</button>
      {previousType && previousType.name !== type.name && (
        <button onClick={() => closeTypeInfo(previousType)}>Back</button>
      )}
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
          </div>
        ))}

        {type.description && <p>{type.description}</p>}
      </div>
      {args && <Arguments args={args} />}
    </div>
  );
}

export default TypeInfo;
