import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import EventService from '../services/events/event.services';

class EditScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Edit Screen</Text>
      </View>
    );
  }
}

export default EditScreen;
