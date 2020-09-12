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
          headerTransparent: true,
          headerLeft: false,
        }}
      />
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerTitle: false, headerTransparent: true}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
