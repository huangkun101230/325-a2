import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

class authService {
  loginUser(email: string, password: string) {
    return firebase.default.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, name: string) {
    return firebase.default
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({email, name});
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  }

  logoutUser() {
    return firebase.default.auth().signOut();
  }
}

const AuthService = new authService();
export default AuthService;
