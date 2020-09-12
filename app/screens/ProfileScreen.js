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

class ProfileScreen extends React.Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       name: '',
  //     };
  //   }

  state = {name: 'haha'};

//   componentDidMount() {
//     this.ProfileService.getUserProfile()
//       .get()
//       .then((userProfileSnapshot) => {
//         // console.log(userProfileSnapshot);
//         this.userProfile = userProfileSnapshot.data();
//         this.state.name = this.userProfile.name;
//       });
//   }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

export default ProfileScreen;
