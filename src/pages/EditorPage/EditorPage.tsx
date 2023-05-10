import { useEffect, useRef, useState } from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import { json } from '@codemirror/lang-json';
import { graphql } from 'cm6-graphql';
import './EditorPage.scss';

const defaultQuery = 'query {\n characters{\n results{\n name \n} \n}\n}';

const EditorPage = () => {
  const queryEditorRef = useRef<HTMLDivElement>(null);
  const responseEditorRef = useRef<HTMLDivElement>(null);
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');

  // Query Editor
  useEffect(() => {
    const view = new EditorView({
      doc: defaultQuery,
      extensions: [
        basicSetup,
        graphql(schema),
        EditorView.updateListener.of((e) => {
          setRequest(e.state.doc.toString());
        }),
      ],
      parent: queryEditorRef.current as Element,
    });

    return () => view.destroy();
  }, [schema]);

  // Response Editor
  useEffect(() => {
    const view = new EditorView({
      doc: response,
      extensions: [basicSetup, json(), EditorView.editable.of(false)],
      parent: responseEditorRef.current as Element,
    });

    return () => view.destroy();
  }, [response]);

  // Get Schema
  useEffect(() => {
    fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    })
      .then((response) => response.json())
      .then((json) => setSchema(buildClientSchema(json.data)));
  }, []);

  // Request
  const handleRequest = () => {
    console.log(request);
    fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: request, variables: {} }),
    })
      .then((response) => response.json())
      .then((data) => setResponse(JSON.stringify(data, null, 2)));
  };

  return (
    <div className="containerEditor">
      <div className="inputEditor">
        <p>Editor</p>
        <div ref={queryEditorRef} />
      </div>
      <div className="outputEditor">
        <p>Response</p>
        <div ref={responseEditorRef} />
      </div>

      <div>
        <button onClick={handleRequest}>Make Request</button>
      </div>
    </div>
  );
};

export default EditorPage;
