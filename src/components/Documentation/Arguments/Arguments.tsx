import { useTranslation } from 'react-i18next';
import DocField from '../DocField';
import { TypeArgumentInterface } from '../DocumentationInterfaces';

export interface TypeInfoProps {
  args: TypeArgumentInterface[];
  pickArg: (arg: TypeArgumentInterface) => void;
}

function Arguments({ args, pickArg }: TypeInfoProps) {
  const { t } = useTranslation('common');
  return (
    <div>
      <h3 className="typeDescription__title">{t('documentation.arguments')}</h3>
      {args.map((arg) => (
        <div className="typeDescription__item" key={arg.name} onClick={() => pickArg(arg)}>
          <DocField field={arg} />
        </div>
      ))}
    </div>
  );
}

export default Arguments;
