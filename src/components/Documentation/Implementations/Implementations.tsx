import { useTranslation } from 'react-i18next';
import { SchemaTypeInterface } from '../types';
import { renderType } from '../DocField';

interface ImplementationsProps {
  type: SchemaTypeInterface;
  pickType: (name: string | null) => void;
}

function Implementations({ type, pickType }: ImplementationsProps) {
  const { t } = useTranslation('common');

  return (
    <div className="typeInfo__args">
      <h3 className="typeInfo__title">{t('documentation.implementations')}</h3>
      {type.possibleTypes?.map((item) => (
        <div className="typeInfo__item" key={item.name} onClick={() => pickType(item.name)}>
          <span className="doc-field__type">{renderType(item)}</span>
        </div>
      ))}
    </div>
  );
}

export default Implementations;
