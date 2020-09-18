/*
This is the Auth navigator
It has two screens: LoginScreen and RegisterScreen
This is been used in the AppNavigator.js
*/

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTitle: false,
          headerLeft: false,
        }}
      />
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerTitle: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
