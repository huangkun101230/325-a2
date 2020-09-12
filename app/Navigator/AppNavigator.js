import React, {useState, useEffect} from 'react';
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
