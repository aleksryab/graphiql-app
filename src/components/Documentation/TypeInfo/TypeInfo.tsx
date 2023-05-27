import { useTranslation } from 'react-i18next';
import './TypeInfo.scss';
import DocField from '../DocField';
import {
  SchemaTypeInterface,
  TypeArgumentInterface,
  TypeFieldInterface,
} from '../DocumentationInterfaces';
import Arguments from '../Arguments';

export interface TypeInfoProps {
  type: SchemaTypeInterface;
  activeField: TypeFieldInterface | TypeArgumentInterface;
  history: (TypeFieldInterface | TypeArgumentInterface)[];
  args: TypeArgumentInterface[] | null;
  findType: (field: TypeFieldInterface | TypeArgumentInterface) => void;
  historyBack: () => void;
  closeTypeInfo: () => void;
}

function TypeInfo({
  type,
  args,
  history,
  activeField,
  closeTypeInfo,
  findType,
  historyBack,
}: TypeInfoProps) {
  const { t } = useTranslation('common');

  const isHistory = history.length > 1;
  const isArgs = !!args?.length;
  const isEnum = type.kind === 'ENUM';
  const isFields = !!(type.fields?.length || type.inputFields?.length || isEnum);

  return (
    <div className="typeInfo">
      <div className="typeInfo__controls">
        <button className="close_button" onClick={closeTypeInfo}>
          {t('button.close')}
        </button>
        {isHistory && (
          <button className="back_button" onClick={historyBack}>
            {t('button.back')}
          </button>
        )}
      </div>
      <div className="typeInfo__current">
        <DocField field={activeField} fullArgs />
      </div>
      <div className="typeInfo__types">
        <h3 className="typeInfo__title">
          {isEnum ? t('documentation.enum_detail') : t('documentation.type_detail')}
        </h3>
        <span>{isEnum ? 'enum' : 'type'} </span>
        <b className="typeInfo__name">{type.name}</b>
        {isFields && <span className="typeInfo__bracket">{' {'}</span>}
        {type.fields?.map((field) => (
          <div className="typeInfo__item" key={field.name} onClick={() => findType(field)}>
            <DocField field={field} />
          </div>
        ))}
        {type.inputFields?.map((field) => (
          <div className="typeInfo__item" key={field.name} onClick={() => findType(field)}>
            <DocField field={field} />
          </div>
        ))}
        {type.enumValues?.map((value) => (
          <div className="typeInfo__enum-item" key={value.name}>
            <span>{value.name}</span>
          </div>
        ))}
        {isFields && <span className="typeInfo__bracket">{'}'}</span>}
        {type.description && <p className="typeInfo__text">{type.description}</p>}
      </div>
      {isArgs && <Arguments args={args} pickArg={findType} />}
    </div>
  );
}

export default TypeInfo;
