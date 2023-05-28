import { lazy, Suspense, useEffect, useState } from 'react';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import './EditorPage.scss';
import { apiRequest } from '../../helpers/API';
import Editors from '../../components/Editors';
import { EditorLanguage } from '../../components/Editors/Editors';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/Error';
import { SchemaInterface } from '../../components/Documentation';
import Fade from '../../components/Fade';
import RoundButtonIcon from '../../components/icons/RoundButtonIcon';
import ApiPanel from '../../components/ApiPanel';
const Documentation = lazy(() => import('../../components/Documentation'));

const defaultApiUrl = 'https://rickandmortyapi.com/graphql';
const defaultQuery = 'query {\n  \n}';
const defaultVariables = '{}';
const defaultHeaders = '{}';

enum EditorTools {
  vars = 'vars',
  headers = 'headers',
}

const EditorPage = () => {
  const [apiUrl, setApiUrl] = useState(defaultApiUrl);
  const [query, setRequest] = useState(defaultQuery);
  const [variables, setVariables] = useState(defaultVariables);
  const [headers, setHeaders] = useState(defaultHeaders);

  const [schema, setSchema] = useState<SchemaInterface | null>(null);
  const [isFetchingSchema, setIsFetchingSchema] = useState(true);
  const [isSchemaError, setIsSchemaError] = useState(false);
  const [clientSchema, setClientSchema] = useState<GraphQLSchema>();

  const [response, setResponse] = useState<string | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const [isFetching, setIsFetching] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<EditorTools>(EditorTools.vars);
  const [isDocumentation, setIsDocumentation] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    setSchema(null);
    setIsFetchingSchema(true);
    setIsSchemaError(false);

    apiRequest(apiUrl, JSON.stringify({ query: getIntrospectionQuery() }))
      .then((json) => {
        setSchema(json.data);
        setClientSchema(buildClientSchema(json.data));
      })
      .catch(() => {
        setIsSchemaError(true);
        setConnectionError(t('error.general.schema'));
      })
      .finally(() => setIsFetchingSchema(false));
  }, [t, apiUrl]);

  const parseJSON = (value: string, errorTitle: string) => {
    if (!value) return {};
    try {
      return JSON.parse(value);
    } catch (err) {
      setIsFetching(false);
      let errorMessage = 'Unknown Error';
      if (err instanceof Error) errorMessage = err.message;
      setParseError(`${errorTitle}: ${errorMessage}`);
      return null;
    }
  };

  const handleRequest = () => {
    setIsFetching(true);
    setResponse(null);
    setParseError(null);
    setConnectionError(null);

    const parsedVars = parseJSON(variables, t('error.variables_parse'));
    const parsedHeaders = parseJSON(headers, t('error.headers_parse'));

    if (parsedVars && parsedHeaders) {
      apiRequest(apiUrl, JSON.stringify({ query, variables: parsedVars }), parsedHeaders)
        .then((data) => setResponse(JSON.stringify(data, null, 2)))
        .catch(() => setConnectionError(t('error.general.response')))
        .finally(() => setIsFetching(false));
    }
  };

  const switchTool = (tool: EditorTools) => {
    setIsToolsOpen(true);
    setActiveTool(tool);
  };

  return (
    <>
      <Fade isVisible={!!connectionError}>
        <ErrorMessage text={connectionError ?? ''} cleanError={() => setConnectionError(null)} />
      </Fade>

      <ApiPanel
        url={apiUrl}
        isLoading={isFetchingSchema}
        isError={isSchemaError}
        onChange={setApiUrl}
      />

      <div className="wrapperEditor">
        <div className="controlsEditor">
          <button
            className="docVertical"
            disabled={!schema}
            onClick={() => setIsDocumentation(!isDocumentation)}
          >
            {t('button.doc')}
          </button>
          <div className="play-button">
            <button
              className="round-button"
              disabled={!schema}
              onClick={handleRequest}
              title={t('button.execute') ?? ''}
            >
              <RoundButtonIcon />
            </button>
          </div>
        </div>

        <div className="containerEditor">
          <div className="inputEditor">
            <p className="editors_title">{t('editor.editor')}</p>
            <Editors
              value={query}
              isReadOnly={false}
              language={EditorLanguage.GRAPH_QL}
              onChange={setRequest}
              schema={clientSchema}
            />
          </div>

          <div className="outputEditor">
            <p className="editors_title">{t('editor.response')}</p>
            {isFetching && <Loading />}
            {parseError && <p className="parse-error">{parseError}</p>}
            {response && (
              <Editors isReadOnly={true} language={EditorLanguage.JSON} value={response} />
            )}
          </div>

          <div className="toolsEditor">
            <div className="toolsEditor__controls">
              <button
                className={`toolsEditor__button${activeTool == EditorTools.vars ? ' active' : ''}`}
                onClick={() => switchTool(EditorTools.vars)}
              >
                {t('editor.variables')}
              </button>
              <button
                className={`toolsEditor__button${
                  activeTool == EditorTools.headers ? ' active' : ''
                }`}
                onClick={() => switchTool(EditorTools.headers)}
              >
                {t('editor.headers')}
              </button>
              <button
                className="toolsEditor__button toolsEditor__toggle"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                title={(isToolsOpen ? t('button.hide_tools') : t('button.show_tools')) ?? ''}
              >
                {isToolsOpen ? <AiOutlineDown /> : <AiOutlineUp />}
              </button>
            </div>
            {isToolsOpen && activeTool === EditorTools.vars && (
              <Editors
                value={variables}
                isReadOnly={false}
                language={EditorLanguage.JSON}
                onChange={setVariables}
              />
            )}
            {isToolsOpen && activeTool === EditorTools.headers && (
              <Editors
                value={headers}
                isReadOnly={false}
                language={EditorLanguage.JSON}
                onChange={setHeaders}
              />
            )}
          </div>

          <Fade isVisible={isDocumentation}>
            <div className="documentationBlock">
              <button
                className="documentationBlock__close"
                onClick={() => setIsDocumentation(false)}
                title={t('button.close_docs') ?? ''}
              >
                <AiOutlineClose />
              </button>
              {isFetchingSchema && <Loading />}
              <Suspense fallback={<Loading />}>
                {schema && <Documentation schema={schema} />}
              </Suspense>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default EditorPage;
