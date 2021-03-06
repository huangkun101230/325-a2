/*
This is the ProfileScreen
This is been linked with HomeNavigator
It uses color and syles config form the config folder
It is using functions provided by the authServices and ProfileService
*/

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import ProfileService from './../services/users/profile.services';
import AuthService from '../services/users/auth.services';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ref = ProfileService.getUserProfile();
    this.unsubscribe = null;
    this.state = {
      displayName: '',
    };
  }

  /**
   * To get the name, we must:
   * userProfile is the current user's documentReference
   * read the document referred by this documentReference and wait for OK signal
   * @param {object} querySnapshot - userProfileSnapshot data sent after OK
   */
  onCollectionUpdate = async (querySnapshot) => {
    const {email, name} = querySnapshot.data();

    this.setState({displayName: name ? name : email});
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  handleLogoff = () => {
    AuthService.logoutUser().catch((error) =>
      this.setState({errorMessage: error.message}),
    );
  };

  AlertWindow = () => {
    Alert.alert(
      'Warning',
      'You are going to log off',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.handleLogoff()},
      ],
      {cancelable: false},
    );
  };

  render() {
    return (
      <View style={cusStyles.container}>
        <View>
          <Text style={cusStyles.displayName}>
            {`Welcome,\n\n${this.state.displayName}`}
          </Text>
        </View>

        <View>
          <TouchableOpacity style={cusStyles.button} onPress={this.AlertWindow}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
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
  displayName: {
    fontSize: 25,
    fontWeight: '800',
  },
  button: {
    marginTop: 32,
    marginHorizontal: 45,
    backgroundColor: colors.red,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
});

export default ProfileScreen;
