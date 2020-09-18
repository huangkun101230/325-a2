/* eslint-disable react-native/no-inline-styles */
/*
This is the Home navigator
It has five screens: ListScreen, PostScreen, DetailScreen, EditScreen, ProfileScreen
This is been used in the AppNavigator.js
*/

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../configs/colors';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faListAlt,
  faPlusCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

import PostScreen from './../screens/PostScreen';
import ProfileScreen from './../screens/ProfileScreen';
import ListScreen from './../screens/ListScreen';
import EditScreen from './../screens/EditScreen';
import DetailScreen from './../screens/DetailScreen';

const HomeStack = createBottomTabNavigator(); //bottom tabs
const ListStack = createStackNavigator(); //main tab of the bottom tab bar

const ListNavigator = () => {
  return (
    <ListStack.Navigator>
      <ListStack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          headerTitle: false,
          headerLeft: false,
          headerTransparent: true,
        }}
      />
      <ListStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerTitle: false,
        }}
      />
      <ListStack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{headerTitle: false}}
      />
      <ListStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{headerTitle: false}}
      />
    </ListStack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          //give bottom tab icon
          if (route.name === 'ListNavigator') {
            return <FontAwesomeIcon icon={faListAlt} color={color} size={32} />;
          } else if (route.name === 'PostScreen') {
            return (
              <FontAwesomeIcon
                icon={faPlusCircle}
                color={colors.addButtonCOlor}
                size={48}
                style={{
                  shadowColor: colors.addButtonCOlor,
                  shadowOffset: {width: 0, height: 0},
                  shadowRadius: 10,
                  shadowOpacity: 0.3,
                }}
              />
            );
          }
          return (
            <FontAwesomeIcon icon={faUserCircle} color={color} size={32} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.gray,
        showLabel: false,
      }}>
      <HomeStack.Screen name="ListNavigator" component={ListNavigator} />
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
