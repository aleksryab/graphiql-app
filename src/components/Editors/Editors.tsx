import { useEffect, useRef } from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { GraphQLSchema } from 'graphql';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import { Extension } from '@codemirror/state';
import { graphql } from 'cm6-graphql';
import './Editors.scss';

export enum EditorLanguage {
  GRAPH_QL = 'graphql',
  JSON = 'json',
}

interface EditorsProps {
  isReadOnly: boolean;
  language: EditorLanguage;
  value?: string;
  schema?: GraphQLSchema;
  onChange?: (value: string) => void;
}

function Editors({ language, value = '', isReadOnly, onChange, schema }: EditorsProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const renderEditor = (extraExtensions: Extension[]) => {
    return new EditorView({
      doc: value,
      extensions: [
        basicSetup,
        EditorView.editable.of(!isReadOnly),
        EditorView.updateListener.of((e) => {
          if (onChange) {
            onChange(e.state.doc.toString().trim());
          }
        }),
        ...extraExtensions,
      ],
      parent: editorRef.current as Element,
    });
  };

  useEffect(() => {
    let editor: EditorView;

    if (language === EditorLanguage.GRAPH_QL) {
      editor = renderEditor([graphql(schema)]);
    } else if (language === EditorLanguage.JSON) {
      editor = renderEditor([json(), linter(jsonParseLinter())]);
    }

    return () => editor?.destroy();
  }, [value, schema, language]);

  return <div ref={editorRef} />;
}

export default Editors;
