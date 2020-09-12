import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';

class LoadingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }
}

export default LoadingScreen;
