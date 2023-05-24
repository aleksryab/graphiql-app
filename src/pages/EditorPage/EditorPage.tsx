import { lazy, Suspense, useEffect, useState } from 'react';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import { useTranslation } from 'react-i18next';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Editors from '../../components/Editors';
import { EditorLanguage } from '../../components/Editors/Editors';
import { apiRequest } from '../../helpers/API';
import Loading from '../../components/Loading';
const Documentation = lazy(() => import('../../components/Documentation'));
import './EditorPage.scss';

const defaultQuery =
  'query getCharacterById($id: ID!) {\n  character(id: $id) {\n    name\n    episode {\n      id\n      name\n    }\n  }\n}';
const defaultVariables = JSON.stringify({ id: 2 }, null, 2);

const EditorPage = () => {
  const [query, setRequest] = useState(defaultQuery);
  const [variables, setVariables] = useState(defaultVariables);
  const [response, setResponse] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [isFetching, setIsFetching] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isDocumentation, setIsDocumentation] = useState(false);
  const { t } = useTranslation('common');

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
    setParseError(null);

    try {
      let parsedVars = '{}';
      parsedVars = JSON.parse(variables);
      apiRequest(JSON.stringify({ query, variables: parsedVars }))
        .then((data) => setResponse(JSON.stringify(data, null, 2)))
        .catch((err) => console.error(err))
        .finally(() => setIsFetching(false));
    } catch (err) {
      setIsFetching(false);
      let errorMessage = 'Unknown Error';
      if (err instanceof Error) errorMessage = err.message;
      setParseError(`${t('error.variables_parse')}: ${errorMessage}`);
    }
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
        <p className="editors_title">{t('editor.editor')}</p>
        <Editors
          value={defaultQuery}
          isReadOnly={false}
          language={EditorLanguage.GRAPH_QL}
          onChange={setRequest}
          schema={schema}
        />
      </div>
      <div className="outputEditor">
        <p className="editors_title">{t('editor.response')}</p>
        {isFetching && <Loading />}
        {parseError && <p className="parse-error">{parseError}</p>}
        {response && <Editors isReadOnly={true} language={EditorLanguage.JSON} value={response} />}
      </div>
      <div className="toolsEditor">
        <div className="toolsEditor__controls">
          <button className="toolsEditor__button" onClick={() => setIsToolsOpen(true)}>
            {t('editor.variables')}
          </button>
          <button className="toolsEditor__button" onClick={() => setIsToolsOpen(!isToolsOpen)}>
            {isToolsOpen ? <AiOutlineDown /> : <AiOutlineUp />}
          </button>
        </div>
        {isToolsOpen && (
          <Editors
            value={variables}
            isReadOnly={false}
            language={EditorLanguage.JSON}
            onChange={setVariables}
          />
        )}
      </div>
      <div className="documentationBlock">
        <button className="docVertical" onClick={() => setIsDocumentation(!isDocumentation)}>
          {t('button.doc')}
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
