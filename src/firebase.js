import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDOiyHKJdnV8ZVxFN6N_h6RFK9evCnDoTw',
  authDomain: 'list-of-paths.firebaseapp.com',
  databaseURL: 'https://list-of-paths.firebaseio.com',
  projectId: 'list-of-paths',
  storageBucket: '',
  messagingSenderId: '31567877341',
  appId: '1:31567877341:web:a60d29794325afa2'
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const database = firebase.database();
