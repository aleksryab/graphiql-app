import './EditorPage.scss';
import Editors from '../../components/Editors';
import { EditorLanguage } from '../../components/Editors/Editors';

const EditorPage = () => {
  const simpleJson = `{
    "glossary": {
        "title": "example glossary",
\t\t"GlossDiv": {
            "title": "S",
\t\t\t"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
\t\t\t\t\t"SortAs": "SGML",
\t\t\t\t\t"GlossTerm": "Standard Generalized Markup Language",
\t\t\t\t\t"Acronym": "SGML",
\t\t\t\t\t"Abbrev": "ISO 8879:1986",
\t\t\t\t\t"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
\t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]
                    },
\t\t\t\t\t"GlossSee": "markup"
                }
            }
        }
    }
}`;
  return (
    <div className="containerEditor">
      <div className="inputEditor">
        <p>Editor</p>
        <Editors isReadOnly={false} language={EditorLanguage.GRAPH_QL} />
      </div>
      <div className="outputEditor">
        <p>Response</p>
        <Editors isReadOnly={true} language={EditorLanguage.JSON} value={simpleJson} />
      </div>
      <div className="variableEditor">
        <p>Variable</p>
        <Editors isReadOnly={false} language={EditorLanguage.JSON} />
      </div>
    </div>
  );
};

export default EditorPage;
