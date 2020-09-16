import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../configs/colors';
import Title from './../components/title';

class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={cusStyles.container}>
        <Title />
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
});

export default LoadingScreen;
