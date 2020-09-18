/*
This component allows us to implement the activity indicator
This is been used during the loading process
*/

import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import colors from './../configs/colors';
import styles from './../configs/styles';

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
}

export default Loading;
