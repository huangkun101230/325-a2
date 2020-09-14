import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../configs/colors';
import styles from '../configs/styles';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLock,
  // faAirFreshener,
  faAnchor,
} from '@fortawesome/free-solid-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

import HomeScreen from './../screens/HomeScreen';
import ProfileScreen from './../screens/ProfileScreen';
import ListScreen from './../screens/ListScreen';

const HomeStack = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          if (route.name === 'ListScreen') {
            return (
              <FontAwesomeIcon icon={faGoogle} color={color} size={size} />
            );
          } else if (route.name === 'CalendarTabScreen') {
            return <FontAwesomeIcon icon={faLock} color={color} size={size} />;
          }
          return <FontAwesomeIcon icon={faAnchor} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.gray,
      }}>
      <HomeStack.Screen name="ListScreen" component={ListScreen} />
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
