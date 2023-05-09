import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useState } from 'react';

interface EditorsProps {
  isReadOnly: boolean;
  language: EditorLanguage;
  value?: string;
}

export enum EditorLanguage {
  GRAPH_QL = 'graphql',
  JSON = 'json',
}

function Editors({ isReadOnly, language, value }: EditorsProps) {
  const [schema, setSchema] = useState<GraphQLSchema>();

  useEffect(() => {
    if (language === EditorLanguage.GRAPH_QL) {
      fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      })
        .then((response) => response.json())
        .then((json) => setSchema(buildClientSchema(json.data)));
    }
  }, []);

  const monaco = useMonaco();

  useEffect(() => {
    if (schema && monaco) {
      monaco.languages.register({ id: 'graphql' });
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        JSON.stringify(schema),
        'graphql-schema.json'
      );
    }
  }, [schema, monaco]);

  return (
    <MonacoEditor
      language={language}
      value={value}
      theme="vs-dark"
      options={{
        readOnly: isReadOnly,
        minimap: { enabled: false },
        suggestOnTriggerCharacters: true,
        wordBasedSuggestions: false,
      }}
    />
  );
}

export default Editors;
