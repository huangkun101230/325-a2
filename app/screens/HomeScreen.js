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

class HomeScreen extends React.Component {
  handleLogoff = () => {
    AuthService.logoutUser().catch((error) =>
      this.setState({errorMessage: error.message}),
    );
  };

  render() {
    return (
      <View style={(styles.container, {flex: 1})}>
        <TouchableOpacity style={styles.button} onPress={this.handleLogoff}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
