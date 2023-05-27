import { SchemaTypeInterface, TypeFieldInterface } from './types';
import DocField from './DocField';

interface DocListProps {
  title: string;
  list: SchemaTypeInterface;
  activeQuery: TypeFieldInterface | null;
  picQuery: (field: TypeFieldInterface) => void;
}

function DocList({ title, list, activeQuery, picQuery }: DocListProps) {
  return (
    <div>
      <h2>{title}</h2>
      <ul className="doc-list">
        {list?.fields?.map((field) => (
          <li
            className={`doc-list__item${activeQuery === field ? ' active' : ''}`}
            key={field.name}
            onClick={() => picQuery(field)}
          >
            <p>
              <DocField field={field} />
            </p>
            <p className="doc-list__description">{field.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocList;
