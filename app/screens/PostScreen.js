import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import LoadingScreen from './../screens/LoadingScreen';
import EventService from '../services/events/event.services';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class PostScreen extends React.Component {
  constructor() {
    super();
    this.ref = EventService.getEventList();
    this.state = {
      courseCode: '',
      assiTitle: '',
      description: '',
      startTime: '',
      dueTime: '',
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  saveBoard = () => {
    this.setState({
      isLoading: true,
    });
    this.ref
      .add({
        courseCode: this.state.courseCode,
        assiTitle: this.state.assiTitle,
        description: this.state.description,
        startTime: this.state.startTime,
        dueTime: this.state.dueTime,
      })
      .then((docRef) => {
        this.setState({
          courseCode: '',
          assiTitle: '',
          description: '',
          startTime: '',
          dueTime: '',
          isLoading: false,
        });
        this.props.navigation.navigate('ListScreen');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={cusStyles.container}>
          <View style={cusStyles.subContainer}>
            <TextInput
              placeholder={'Course Code'}
              autoCapitalize="characters"
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'courseCode')}
            />
          </View>
          <View style={cusStyles.subContainer}>
            <TextInput
              placeholder={'Title'}
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'assiTitle')}
            />
          </View>
          <View style={cusStyles.subContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={(text) => this.updateTextInput(text, 'description')}
            />
          </View>

          <View style={cusStyles.button}>
            <Button
              large
              // leftIcon={{ name: 'save' }}
              title="Save"
              onPress={this.saveBoard}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const cusStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  inputTitle: {
    color: colors.gray,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostScreen;
