import React, {useEffect} from 'react';
import LoadingScreen from './../screens/LoadingScreen';
import firebase from './../firebase';

const SwitchNavigator = ({navigation}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? 'HomeNavigator' : 'AuthNavigator');
    });
  }, [navigation]);

  return <LoadingScreen />;
};

export default SwitchNavigator;
