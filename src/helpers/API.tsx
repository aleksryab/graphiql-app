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
