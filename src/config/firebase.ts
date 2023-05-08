import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAXZBoKaRWKBNMCUlIz_dlAGCvbjQLj9_o',
  authDomain: 'graphiql-app-dae72.firebaseapp.com',
  projectId: 'graphiql-app-dae72',
  storageBucket: 'graphiql-app-dae72.appspot.com',
  messagingSenderId: '1057881079297',
  appId: '1:1057881079297:web:87fa0855b804c44fd88a00',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
