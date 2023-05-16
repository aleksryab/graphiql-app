import DocField from '../DocField';
import { TypeArgumentInterface } from '../DocumentationInterfaces';

export interface TypeInfoProps {
  args: TypeArgumentInterface[];
}

function Arguments({ args }: TypeInfoProps) {
  return (
    <div>
      <h3>Arguments</h3>
      {args.map((arg) => (
        <div className="type-info__item" key={arg.name}>
          <DocField field={arg} />
        </div>
      ))}
    </div>
  );
}

export default Arguments;
