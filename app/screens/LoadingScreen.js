/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../configs/colors';

class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={cusStyles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={cusStyles.divider} />
          <Text style={cusStyles.title}>
            Assignment
            <Text style={{fontWeight: '300', color: colors.primary}}>
              Manager
            </Text>
          </Text>
          <View style={cusStyles.divider} />
        </View>
      </View>
    );
  }
}

const cusStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.secondary,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 34,
  },
});

export default LoadingScreen;
