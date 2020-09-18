/* eslint-disable react-native/no-inline-styles */
/*
This is the RegisterScreen
This is been linked with liginScreen
It uses color and syles config form the config folder
It is using functions provided by the auth.services and GoogleSignin
It uses the icon from fontawesome
*/

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
import Loading from './../components/loading';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

import AuthService from './../services/users/auth.services';

class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      errorMessage: null,
      isLoading: false,
    };
  }

  //signup user by using signupUser function provided by the AuthService
  handleSignup = () => {
    const {email, password, name} = this.state;
    AuthService.signupUser(email, password, name).catch((error) =>
      this.setState({errorMessage: error.message, isLoading: false}),
    );
  };

  render() {
    //show the loading avtivity indicator if it's loading
    if (this.state.isLoading) {
      <Loading />;
    }

    return (
      <View style={cusStyles.container}>
        <Text style={cusStyles.greeting}>
          {'Hello!\nSign up to get started.'}
        </Text>

        <View style={cusStyles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={cusStyles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={cusStyles.form}>
          <View>
            <Text style={cusStyles.inputTitle}>email adress</Text>
            <TextInput
              style={cusStyles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCompleteType="email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>

          <View style={{marginTop: 32}}>
            <Text style={cusStyles.inputTitle}>password</Text>
            <TextInput
              style={cusStyles.input}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <View style={{marginTop: 32}}>
            <Text style={cusStyles.inputTitle}>full name</Text>
            <TextInput
              style={cusStyles.input}
              autoCapitalize="words"
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
          </View>

          {/* Sign up button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handleSignup();
              this.setState((state) => ({isLoading: true}));
            }}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          {/* ---or--- */}
          <View style={{flexDirection: 'row', marginTop: 32}}>
            <View
              style={{
                backgroundColor: colors.gray,
                height: 1,
                flex: 1,
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: colors.gray,
                alignSelf: 'center',
                paddingHorizontal: 5,
                fontSize: 10,
              }}>
              OR
            </Text>
            <View
              style={{
                backgroundColor: colors.gray,
                height: 1,
                flex: 1,
                alignSelf: 'center',
              }}
            />
          </View>

          {/* Google button */}
          <TouchableOpacity
            style={[
              styles.button,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <FontAwesomeIcon
              icon={faGoogle}
              color={colors.white}
              size={24}
              style={{marginRight: 25}}
            />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const cusStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: colors.red,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: colors.gray,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: colors.input,
  },
});

export default RegisterScreen;
