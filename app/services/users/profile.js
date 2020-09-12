// import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';

// class profileService {
//   // public userProfile: firebase.firestore.DocumentReference;
//   // public currentUser: firebase.User;

//   constructor() {
//     firebase.default.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.currentUser = user;
//         this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
//       }
//     });
//   }

//   getUserProfile(): firebase.firestore.DocumentReference {
//     return this.userProfile;
//   }

//   updateName(name: string): Promise<any> {
//     return this.userProfile.update({name});
//   }

//   updateEmail(newEmail: string, password: string): Promise<any> {
//     const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
//       this.currentUser.email,
//       password,
//     );
//     return this.currentUser
//       .reauthenticateWithCredential(credential)
//       .then(() => {
//         this.currentUser.updateEmail(newEmail).then(() => {
//           this.userProfile.update({email: newEmail});
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   updatePassword(newPassword: string, oldPassword: string): Promise<any> {
//     const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
//       this.currentUser.email,
//       oldPassword,
//     );
//     return this.currentUser
//       .reauthenticateWithCredential(credential)
//       .then(() => {
//         this.currentUser.updatePassword(newPassword).then(() => {
//           console.log('Password Changed');
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   getUserId() {
//     return this.currentUser.uid;
//   }
// }

// const ProfileService = new profileService();
// export default ProfileService;
