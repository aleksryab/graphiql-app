import { useEffect, useState } from 'react';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import Editors from '../../components/Editors';
import { EditorLanguage } from '../../components/Editors/Editors';
import { apiRequest } from '../../helpers/API';
import Loading from '../../components/Loading';
import Documentation from '../../components/Documentation';
import './EditorPage.scss';

const defaultQuery = 'query {\n characters{\n results{\n name \n} \n}\n}';

const EditorPage = () => {
  const [query, setRequest] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [variable, setVariable] = useState('{}');
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [documentation, setDocumentation] = useState();
  const [isDocumentation, setIsDocumentation] = useState(false);

  useEffect(() => {
    apiRequest(JSON.stringify({ query: getIntrospectionQuery() }))
      .then((json) => {
        setDocumentation(json.data);
        setSchema(buildClientSchema(json.data));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleRequest = () => {
    setIsFetching(true);
    setResponse(null);

    apiRequest(JSON.stringify({ query, variables: JSON.parse(variable || '{}') }))
      .then((data) => setResponse(JSON.stringify(data, null, 2)))
      .catch((err) => console.error(err))
      .finally(() => setIsFetching(false));
  };

  return (
    <div className="containerEditor">
      <div className="inputEditor">
        <p>Editor</p>
        <Editors
          value={defaultQuery}
          isReadOnly={false}
          language={EditorLanguage.GRAPH_QL}
          onChange={setRequest}
          schema={schema}
        />
      </div>
      <div className="outputEditor">
        <p>Response</p>
        {isFetching && <Loading />}
        {response && <Editors isReadOnly={true} language={EditorLanguage.JSON} value={response} />}
      </div>
      <div className="input">
        <p>Variable</p>
        <Editors
          value={variable}
          isReadOnly={false}
          language={EditorLanguage.JSON}
          onChange={setVariable}
        />
        <div>
          <button onClick={handleRequest}>Make Request</button>
        </div>
      </div>
      <div className="documentationBlock">
        {documentation && (
          <button className="docVertical" onClick={() => setIsDocumentation(!isDocumentation)}>
            Documentation
          </button>
        )}
        {isDocumentation && <Documentation schema={documentation} />}
      </div>
    </div>
  );
};

export default EditorPage;
