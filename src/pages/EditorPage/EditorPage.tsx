import './EditorPage.scss'
import Editors from '../../components/Editors';
import {EditorLanguage} from '../../components/Editors/Editors';

const EditorPage = () => {
    const simpleJson = '{\n' +
        '    "glossary": {\n' +
        '        "title": "example glossary",\n' +
        '\t\t"GlossDiv": {\n' +
        '            "title": "S",\n' +
        '\t\t\t"GlossList": {\n' +
        '                "GlossEntry": {\n' +
        '                    "ID": "SGML",\n' +
        '\t\t\t\t\t"SortAs": "SGML",\n' +
        '\t\t\t\t\t"GlossTerm": "Standard Generalized Markup Language",\n' +
        '\t\t\t\t\t"Acronym": "SGML",\n' +
        '\t\t\t\t\t"Abbrev": "ISO 8879:1986",\n' +
        '\t\t\t\t\t"GlossDef": {\n' +
        '                        "para": "A meta-markup language, used to create markup languages such as DocBook.",\n' +
        '\t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\n' +
        '                    },\n' +
        '\t\t\t\t\t"GlossSee": "markup"\n' +
        '                }\n' +
        '            }\n' +
        '        }\n' +
        '    }\n' +
        '}'
    return (
        <div className='containerEditor'>
            <div className='inputEditor'>
                <p>Editor</p>
                <Editors isReadOnly={false} language={EditorLanguage.GRAPH_QL}/>
            </div>
            <div className='outputEditor'>
                <p>Response</p>
                <Editors isReadOnly={true} language={EditorLanguage.JSON} value={simpleJson}/>
            </div>
            <div className='variableEditor'>
                <p>Variable</p>
                <Editors isReadOnly={false} language={EditorLanguage.GRAPH_QL}/>
            </div>
        </div>
    );
};

export default EditorPage;
