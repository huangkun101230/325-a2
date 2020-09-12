import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './../screens/HomeScreen';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
