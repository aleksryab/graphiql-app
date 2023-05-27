// https://rickandmortyapi.com/graphql
// https://graphqlzero.almansi.me/api
// https://countries.trevorblades.com
// https://spacex-production.up.railway.app

export const apiRequest = (body: string, extraHeaders: Record<string, string> = {}) => {
  return fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      ...extraHeaders,
      'Content-Type': 'application/json',
    },
    body,
  }).then((response) => response.json());
};
