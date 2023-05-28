import { useTranslation } from 'react-i18next';
import './TypeInfo.scss';
import { SchemaTypeInterface, TypeArgumentInterface, TypeFieldInterface } from '../types';
import DocField from '../DocField';
import Arguments from '../Arguments';
import Implementations from '../Implementations';

export interface TypeInfoProps {
  type: SchemaTypeInterface;
  activeField: TypeFieldInterface | TypeArgumentInterface;
  history: (TypeFieldInterface | TypeArgumentInterface)[];
  args: TypeArgumentInterface[] | null;
  pickType: (field: TypeFieldInterface | TypeArgumentInterface) => void;
  findType: (name: string | null) => void;
  historyBack: () => void;
  closeTypeInfo: () => void;
}

function TypeInfo({
  type,
  args,
  history,
  activeField,
  closeTypeInfo,
  pickType,
  findType,
  historyBack,
}: TypeInfoProps) {
  const { t } = useTranslation('common');

  const isHistory = history.length > 1;
  const isArgs = !!args?.length;
  const isImplementations = !!type.possibleTypes?.length;
  const isEnum = type.kind === 'ENUM';
  const isInterface = type.kind === 'INTERFACE';
  const isFields = !!(type.fields?.length || type.inputFields?.length || isEnum);
  const interfaces = type.interfaces;

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
          {isEnum
            ? t('documentation.enum_detail')
            : isInterface
            ? t('documentation.interface_detail')
            : t('documentation.type_detail')}
        </h3>
        <span>{isEnum ? 'enum' : isInterface ? 'interface' : 'type'} </span>
        <b className="typeInfo__name">{type.name}</b>
        {interfaces?.map((item) => (
          <div className="typeInfo__item left" key={item.name} onClick={() => findType(item.name)}>
            <span className="doc-field__type">implements </span>
            <span>
              {item.name} {' {'}
            </span>
          </div>
        ))}
        {isFields && !type.interfaces?.length && <span className="typeInfo__bracket">{' {'}</span>}
        {type.fields?.map((field) => (
          <div className="typeInfo__item" key={field.name} onClick={() => pickType(field)}>
            <DocField field={field} />
          </div>
        ))}
        {type.inputFields?.map((field) => (
          <div className="typeInfo__item" key={field.name} onClick={() => pickType(field)}>
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
      {isArgs && <Arguments args={args} pickArg={pickType} />}
      {isImplementations && <Implementations type={type} pickType={findType} />}
    </div>
  );
}

export default TypeInfo;
