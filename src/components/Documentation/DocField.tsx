import {
  TypeArgumentInterface,
  TypeDescriptionInterface,
  TypeFieldInterface,
} from './DocumentationInterfaces';

interface DocFieldProps {
  field: TypeFieldInterface | TypeArgumentInterface;
}

function renderType(type: TypeDescriptionInterface) {
  // if (type.kind === 'INPUT_OBJECT') {
  //   return (
  //     <>
  //       <span>{type.name}</span>
  //       <span className="doc-field__brackets">{' = {}'}</span>
  //     </>
  //   );
  // }

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
  const { name, type } = field;
  const isArgs = !!('args' in field && field.args && field.args.length);

  return (
    <span className="doc-field">
      <span className="doc-field__name">{name}</span>
      {isArgs && <span className="doc-field__args">(...)</span>}:{' '}
      <span className="doc-field__type">{renderType(type)}</span>
    </span>
  );
}

export default DocField;
