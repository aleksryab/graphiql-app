import { useEffect, useRef, useState } from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import { json } from '@codemirror/lang-json';
import { LanguageSupport } from '@codemirror/language';
import { Extension } from '@codemirror/state';
import { graphql } from 'cm6-graphql';
import { apiRequest } from '../../helpers/API';

interface EditorsProps {
  isReadOnly: boolean;
  language: EditorLanguage;
  value?: string;
  setData?: (data) => void;
  setSchema?: (data) => void;
}

export enum EditorLanguage {
  GRAPH_QL = 'graphql',
  JSON = 'json',
}

const defaultQuery = 'query {\n characters{\n results{\n name \n} \n}\n}';

function Editors({ isReadOnly, language, value, setData, setSchema }: EditorsProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<EditorView | null>(null);

  const renderEditor = (langType: LanguageSupport | Extension, data?: string) => {
    if (editor) {
      editor.destroy();
    }
    const view = new EditorView({
      doc: data,
      extensions: [
        basicSetup,
        langType,
        EditorView.editable.of(!isReadOnly),
        EditorView.updateListener.of((e) => {
          if (setData) {
            setData(e.state.doc.toString());
          }
        }),
      ],
      parent: editorRef.current as Element,
    });
    setEditor(view);
  };

  // Get Schema
  useEffect(() => {
    if (language === EditorLanguage.GRAPH_QL) {
      apiRequest(JSON.stringify({ query: getIntrospectionQuery() })).then((json) => {
        if (setSchema) {
          setSchema(json.data);
        }
        renderEditor(graphql(buildClientSchema(json.data)), defaultQuery);
      });
    } else if (language === EditorLanguage.JSON) {
      renderEditor(json(), value);
    }
  }, [value]);

  return <div ref={editorRef} />;
}

export default Editors;
