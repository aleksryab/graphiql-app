import { TypeArgumentInterface, TypeDescriptionInterface, TypeFieldInterface } from './types';

interface DocFieldProps {
  field: TypeFieldInterface | TypeArgumentInterface;
  fullArgs?: boolean;
}

function renderType(type: TypeDescriptionInterface) {
  if (!type.ofType) return <>{type.name}</>;

  if (type.kind === 'NON_NULL') {
    return (
      <span>
        {renderType(type.ofType)}
        {'!'}
      </span>
    );
  }

  if (type.kind === 'LIST') {
    return (
      <span>
        {'['}
        {renderType(type.ofType)}
        {']'}
      </span>
    );
  }
}

function DocField({ field, fullArgs = false }: DocFieldProps) {
  const { name, type } = field;
  const isArgs = !!('args' in field && field.args && field.args.length);

  return (
    <span className="doc-field">
      <span className="doc-field__name">{name}</span>
      {isArgs && (
        <span className="doc-field__args">
          {fullArgs ? (
            <>
              {'('}
              {field.args.map((arg) => (
                <span className="doc-field__arg" key={arg.name}>
                  <DocField field={arg} />
                </span>
              ))}
              {')'}
            </>
          ) : (
            '(...)'
          )}
        </span>
      )}
      : <span className="doc-field__type">{renderType(type)}</span>
    </span>
  );
}

export default DocField;
