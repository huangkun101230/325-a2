import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import colors from '../configs/colors';
import Loading from './../components/loading';

class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={cusStyles.container}>
        <Loading />
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
