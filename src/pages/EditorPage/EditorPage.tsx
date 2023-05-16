import { lazy, Suspense, useEffect, useState } from 'react';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import Editors from '../../components/Editors';
import { EditorLanguage } from '../../components/Editors/Editors';
import { apiRequest } from '../../helpers/API';
import Loading from '../../components/Loading';
const Documentation = lazy(() => import('../../components/Documentation'));
import './EditorPage.scss';

const defaultQuery = 'query {\n characters{\n results{\n name \n} \n}\n}';

const EditorPage = () => {
  const [query, setRequest] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [variable, setVariable] = useState('{}');
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [isDocumentation, setIsDocumentation] = useState(false);

  useEffect(() => {
    apiRequest(JSON.stringify({ query: getIntrospectionQuery() }))
      .then((json) => {
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
      <div className="play-button">
        <button className="round-button" onClick={handleRequest}>
          <svg
            className="round-button_icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="icon_play"
              d="M9.525 18.025C9.19167 18.2417 8.85433 18.2544 8.513 18.063C8.17167 17.8717 8.00067 17.5757 8 17.175V6.82503C8 6.42503 8.171 6.12903 8.513 5.93703C8.855 5.74503 9.19233 5.7577 9.525 5.97503L17.675 11.15C17.975 11.35 18.125 11.6334 18.125 12C18.125 12.3667 17.975 12.65 17.675 12.85L9.525 18.025Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="inputEditor">
        <p className="editors_title">Editor</p>
        <Editors
          value={defaultQuery}
          isReadOnly={false}
          language={EditorLanguage.GRAPH_QL}
          onChange={setRequest}
          schema={schema}
        />
      </div>
      <div className="outputEditor">
        <p className="editors_title">Response</p>
        {isFetching && <Loading />}
        {response && <Editors isReadOnly={true} language={EditorLanguage.JSON} value={response} />}
      </div>
      <div className="variableEditor">
        <p className="editors_title">Variable</p>
        <Editors
          value={variable}
          isReadOnly={false}
          language={EditorLanguage.JSON}
          onChange={setVariable}
        />
      </div>
      <div className="documentationBlock">
        <button className="docVertical" onClick={() => setIsDocumentation(!isDocumentation)}>
          Documentation
        </button>
        {isDocumentation && (
          <Suspense fallback={<Loading />}>
            <Documentation />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default EditorPage;
