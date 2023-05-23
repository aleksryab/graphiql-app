import DocField from '../DocField';
import { SchemaTypeInterface, TypeArgumentInterface } from '../DocumentationInterfaces';
import getTypeName from '../helpers/getTypeName';
import Arguments from '../Arguments';
import { useTranslation } from 'react-i18next';

export interface TypeInfoProps {
  type: SchemaTypeInterface;
  previousType: SchemaTypeInterface | null;
  closeTypeInfo: (typeInfo: SchemaTypeInterface | null) => void;
  findType: (name: string | null) => void;
  args: TypeArgumentInterface[] | null;
}

function TypeInfo({ type, previousType, closeTypeInfo, findType, args }: TypeInfoProps) {
  const { t } = useTranslation('common');
  return (
    <div className="typeDescription">
      <button className="close_button" onClick={() => closeTypeInfo(null)}>
        {t('button.close')}
      </button>
      {previousType && previousType.name !== type.name && (
        <button className="back_button" onClick={() => closeTypeInfo(previousType)}>
          {t('button.back')}
        </button>
      )}
      <div>
        <h3>{t('documentation.type_detail')}</h3>
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
