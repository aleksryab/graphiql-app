// https://rickandmortyapi.com/graphql
// https://graphqlzero.almansi.me/api
// https://countries.trevorblades.com
// https://spacex-production.up.railway.app
// https://graphql.anilist.co
// https://swapi-graphql.netlify.app/.netlify/functions/index

export const apiRequest = (
  url: string,
  body: string,
  extraHeaders: Record<string, string> = {}
) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      ...extraHeaders,
      'Content-Type': 'application/json',
    },
    body,
  }).then((response) => response.json());
};
