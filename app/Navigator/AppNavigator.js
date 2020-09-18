/*
This is the main navigator contains all other navigators
It has three screens: Loading, AuthNavigator and HomeNavigator
This is been used in the App.js
*/

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SwitchNavigator from './SwitchNavigator';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';

const AppStack = createStackNavigator();

class AppNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <AppStack.Navigator initialRouteName="LoadingScreen" headerMode="none">
          <AppStack.Screen name="Loading" component={SwitchNavigator} />
          <AppStack.Screen name="AuthNavigator" component={AuthNavigator} />
          <AppStack.Screen name="HomeNavigator" component={HomeNavigator} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
