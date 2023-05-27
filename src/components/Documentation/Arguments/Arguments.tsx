import { useTranslation } from 'react-i18next';
import DocField from '../DocField';
import { TypeArgumentInterface } from '../types';

export interface TypeInfoProps {
  args: TypeArgumentInterface[];
  pickArg: (arg: TypeArgumentInterface) => void;
}

function Arguments({ args, pickArg }: TypeInfoProps) {
  const { t } = useTranslation('common');
  return (
    <div className="typeInfo__args">
      <h3 className="typeInfo__title">{t('documentation.arguments')}</h3>
      {args.map((arg) => (
        <div className="typeInfo__item" key={arg.name} onClick={() => pickArg(arg)}>
          <DocField field={arg} />
          {arg.defaultValue ? <span> = {String(arg.defaultValue)}</span> : ''}
        </div>
      ))}
    </div>
  );
}

export default Arguments;
