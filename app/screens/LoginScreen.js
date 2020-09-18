/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import AuthService from './../services/users/auth.services';
import {statusCodes} from '@react-native-community/google-signin';
import GoogleSignin from './../googleLogin';

class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage: null,
        };
    }

    googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    handleLogin = () => {
        const { email, password } = this.state;
        AuthService.loginUser(email, password).catch(error => this.setState({ errorMessage: error.message }));
    }

    render() {
        return (
            <View style={cusStyles.container}>
                <Text style={cusStyles.greeting}>{'Hello again.\nWelcome back.'}</Text>

                <View style={cusStyles.errorMessage}>
                    {this.state.errorMessage && <Text style={cusStyles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={cusStyles.form}>
                    <View>
                        <Text style={cusStyles.inputTitle}>email adress</Text>
                        <TextInput
                            style={cusStyles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoCompleteType="email"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={cusStyles.inputTitle}>password</Text>
                        <TextInput
                            style={cusStyles.input}
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }} onPress={() => { this.props.navigation.navigate('RegisterScreen'); }}>
                        <Text>New to Assignment Manager? <Text style={{ fontWeight: '500', color: colors.secondary }}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: 32 }}>
                        <View style={{ backgroundColor: colors.gray, height: 1, flex: 1, alignSelf: 'center' }} />
                        <Text style={{ color: colors.gray, alignSelf: 'center', paddingHorizontal: 5, fontSize: 10 }}>OR</Text>
                        <View style={{ backgroundColor: colors.gray, height: 1, flex: 1, alignSelf: 'center' }} />
                    </View>

                    <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]} onPress={this.googleSignIn}>
                        <FontAwesomeIcon icon={faGoogle} color={colors.white} size={24} style={{ marginRight: 25 }} />
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

export default LoginScreen;
