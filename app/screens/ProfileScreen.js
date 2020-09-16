import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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

  render() {
    return (
      <View style={cusStyles.container}>
        <View>
          <Text style={cusStyles.displayName}>
            {`Welcome,\n\n${this.state.displayName}`}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={cusStyles.button}
            onPress={this.handleLogoff}>
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
