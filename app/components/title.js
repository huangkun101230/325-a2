/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from './../configs/colors';

class Title extends React.Component {
  render() {
    return (
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
    );
  }
}

const cusStyles = StyleSheet.create({
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

export default Title;
