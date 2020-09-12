import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import AuthService from './../services/users/auth';

class ListScreen extends React.Component {
  render() {
    return (
      <View style={(styles.container, {flex: 1})}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

export default ListScreen;
