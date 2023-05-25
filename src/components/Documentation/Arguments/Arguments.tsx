import DocField from '../DocField';
import { TypeArgumentInterface } from '../Documentation';
import { useTranslation } from 'react-i18next';

export interface TypeInfoProps {
  args: TypeArgumentInterface[];
}

function Arguments({ args }: TypeInfoProps) {
  const { t } = useTranslation('common');
  return (
    <div>
      <h3>{t('documentation.arguments')}</h3>
      {args.map((arg) => (
        <div className="type-info__item" key={arg.name}>
          <DocField field={arg} />
        </div>
      ))}
    </div>
  );
}

export default Arguments;
