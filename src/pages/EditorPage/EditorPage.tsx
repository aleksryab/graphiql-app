import './EditorPage.scss';
import { useState } from 'react';
import Editors from '../../components/Editors';
import { EditorLanguage } from '../../components/Editors/Editors';

const EditorPage = () => {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [variable, setVariable] = useState('');
  const [schema, setSchema] = useState('');

  const handleRequest = () => {
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
        <Editors
          isReadOnly={false}
          language={EditorLanguage.GRAPH_QL}
          setData={setRequest}
          setSchema={setSchema}
        />
      </div>
      <div className="outputEditor">
        <p>Response</p>
        <Editors isReadOnly={true} language={EditorLanguage.JSON} value={response} />
      </div>
      <div className="input">
        <p>Variable</p>
        <Editors isReadOnly={false} language={EditorLanguage.JSON} setData={setVariable} />
      </div>
      <div>
        <button onClick={handleRequest}>Make Request</button>
      </div>
    </div>
  );
};

export default EditorPage;
