import Editor from '@monaco-editor/react';

interface EditorsProps {
    isReadOnly: boolean,
    language: EditorLanguage,
    value?: string
}

export enum EditorLanguage {
    GRAPH_QL = 'graphql',
    JSON = 'json'
}

function Editors({isReadOnly, language, value}: EditorsProps) {
    return (
        <Editor language={language} value={value} theme="vs-dark" options={{readOnly: isReadOnly, minimap: {enabled: false}}}/>
    );
}

export default Editors;