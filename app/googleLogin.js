import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '178012783535-i0ca4189qgp8d2khsj7dlf2e0p9mi77l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

export default GoogleSignin;
