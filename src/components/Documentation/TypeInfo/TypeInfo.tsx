import { useTranslation } from 'react-i18next';
import './TypeInfo.scss';
import {
  KindTypes,
  SchemaTypeInterface,
  TypeArgumentInterface,
  TypeFieldInterface,
} from '../types';
import DocField, { renderType } from '../DocField';
import Arguments from '../Arguments';
import Implementations from '../Implementations';

interface TypeInfoProps {
  type: SchemaTypeInterface;
  activeField: TypeFieldInterface | TypeArgumentInterface;
  history: (TypeFieldInterface | TypeArgumentInterface)[];
  args: TypeArgumentInterface[] | null;
  pickType: (field: TypeFieldInterface | TypeArgumentInterface) => void;
  findType: (name: string | null) => void;
  historyBack: () => void;
  closeTypeInfo: () => void;
}

function getKindInfo(kind: KindTypes) {
  switch (kind) {
    case 'ENUM':
      return { kindName: 'enum', titleId: 'documentation.enum_detail' };
    case 'INTERFACE':
      return { kindName: 'interface', titleId: 'documentation.interface_detail' };
    case 'UNION':
      return { kindName: 'union', titleId: 'documentation.union_detail' };
    default:
      return { kindName: 'type', titleId: 'documentation.type_detail' };
  }
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
  const isEnumType = type.kind === 'ENUM';
  const isUnionType = type.kind === 'UNION';
  const isInterfaceType = type.kind === 'INTERFACE';
  const isImplementations = !!type.possibleTypes?.length;
  const isFields = !!(type.fields?.length || type.inputFields?.length || isEnumType);
  const { kindName, titleId } = getKindInfo(type.kind);

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
        <h3 className="typeInfo__title">{t(titleId)}</h3>
        <span>{kindName} </span>
        <b className="typeInfo__name">{type.name}</b>
        {isUnionType && <span> = </span>}
        {isUnionType &&
          type.possibleTypes?.map((item) => (
            <div className="typeInfo__item" key={item.name} onClick={() => findType(item.name)}>
              <span className="doc-field__type">{renderType(item)}</span>
            </div>
          ))}
        {type.interfaces?.map((item) => (
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
      {isImplementations && isInterfaceType && <Implementations type={type} pickType={findType} />}
    </div>
  );
}

export default TypeInfo;
