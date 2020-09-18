/*
This is the swtich navigator
It has two navigators: HomeNavigator and AuthNavigator and one screen LoadingScreen
It will access to LoadingScreen by defatult and then check whether the user has logged in
If yes, jump to HomeNavigator, otherwises, to AuthNavigator
*/

import React, {useEffect} from 'react';
import LoadingScreen from './../screens/LoadingScreen';
import firebase from './../firebase';

const SwitchNavigator = ({navigation}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.replace(user ? 'HomeNavigator' : 'AuthNavigator');
    });
  }, [navigation]);

  return <LoadingScreen />;
};

export default SwitchNavigator;
