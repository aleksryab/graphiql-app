import { TypeDescriptionInterface, TypeFieldInterface } from './DocumentationInterfaces';

interface DocFieldProps {
  field: TypeFieldInterface;
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

function DocField({ field }: DocFieldProps) {
  const { name, args, type } = field;
  const isArgs = !!args.length;

  return (
    <div className="doc-field">
      <span className="doc-field__name">{name}</span>
      {isArgs && <span className="doc-field__args">(...)</span>}:{' '}
      <span className="doc-field__type">{renderType(type)}</span>
    </div>
  );
}

export default DocField;
