import { SchemaTypeInterface } from '../DocumentationInterfaces';

export interface TypeInfoProps {
  type: SchemaTypeInterface;
  closeTypeInfo: (close) => void;
}

function TypeInfo({ type, closeTypeInfo }: TypeInfoProps) {
  return (
    <div className="typeDescription">
      <button onClick={() => closeTypeInfo(null)}>Close</button>
      <h2>{type.name}</h2>
      <div>
        {type.fields.map((data) => (
          <div key={data.name}>
            <p>
              Field name:{' '}
              <b>
                {data.name} : {data.type.name}
              </b>
            </p>
            <p>
              Description:
              <b>{data.description}</b>
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypeInfo;
