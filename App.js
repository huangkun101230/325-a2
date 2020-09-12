/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppNavigator from './app/Navigator/AppNavigator';
import * as firebase from 'firebase/app';

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

const App: () => React$Node = () => {
  return <AppNavigator />;
};

export default App;
