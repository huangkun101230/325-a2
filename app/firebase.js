/*
This is the firebase config and initialize file
This is been used with any services and switchNavigator
It returns an initialized firebase object
*/

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCg7QVLN7DC4ZfsIckwU_NeSTT907mn118',
  authDomain: 'new-assimanager-a2-7eff6.firebaseapp.com',
  databaseURL: 'https://new-assimanager-a2-7eff6.firebaseio.com',
  projectId: 'new-assimanager-a2-7eff6',
  storageBucket: 'new-assimanager-a2-7eff6.appspot.com',
  messagingSenderId: '178012783535',
  // appId: '1:178012783535:web:7a443408651dacf9ed655a',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
