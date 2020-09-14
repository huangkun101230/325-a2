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
import ProfileService from './../services/users/profile';
import AuthService from './../services/users/auth';

class ProfileScreen extends React.Component {
  constructor() {
    super();
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>{this.state.displayName}</Text>
        </View>

        <View style={(styles.container, {flex: 1})}>
          <TouchableOpacity style={styles.button} onPress={this.handleLogoff}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ProfileScreen;
