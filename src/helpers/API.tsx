export const apiRequest = (body: string) => {
  return fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).then((response) => response.json());
};
