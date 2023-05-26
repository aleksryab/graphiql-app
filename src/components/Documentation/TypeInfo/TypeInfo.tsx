import DocField from '../DocField';
import {
  SchemaTypeInterface,
  TypeArgumentInterface,
  TypeFieldInterface,
} from '../DocumentationInterfaces';

import Arguments from '../Arguments';
import { useTranslation } from 'react-i18next';

export interface TypeInfoProps {
  type: SchemaTypeInterface;
  history: (TypeFieldInterface | TypeArgumentInterface)[];
  args: TypeArgumentInterface[] | null;
  findType: (field: TypeFieldInterface | TypeArgumentInterface) => void;
  historyBack: () => void;
  closeTypeInfo: () => void;
}

function TypeInfo({ type, args, history, closeTypeInfo, findType, historyBack }: TypeInfoProps) {
  const { t } = useTranslation('common');

  const isHistory = history.length > 1;
  const isArgs = !!args?.length;
  const isFields = !!(type.fields?.length || type.inputFields?.length);

  return (
    <div className="typeDescription">
      <div className="typeDescription__controls">
        <button className="close_button" onClick={closeTypeInfo}>
          {t('button.close')}
        </button>
        {isHistory && (
          <button className="back_button" onClick={historyBack}>
            {t('button.back')}
          </button>
        )}
      </div>
      <div className="typeDescription__types">
        <h3 className="typeDescription__title">{t('documentation.type_detail')}</h3>
        <span>type </span>
        <b className="typeDescription__name">{type.name}</b>
        {isFields && <span className="typeDescription__bracket">{' {'}</span>}
        {type.fields?.map((field) => (
          <div className="typeDescription__item" key={field.name} onClick={() => findType(field)}>
            <DocField field={field} />
          </div>
        ))}
        {type.inputFields?.map((field) => (
          <div className="typeDescription__item" key={field.name} onClick={() => findType(field)}>
            <DocField field={field} />
          </div>
        ))}
        {isFields && <span className="typeDescription__bracket">{'}'}</span>}
        {type.description && <p className="typeDescription__text">{type.description}</p>}
      </div>
      {isArgs && <Arguments args={args} pickArg={findType} />}
    </div>
  );
}

export default TypeInfo;
