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
import EventService from '../services/events/event.services';
import TimePicker from '../components/timePicker';
import Loading from './../components/loading';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ref = EventService.getEventList();
    this.state = {
      courseCode: '',
      assiTitle: '',
      description: '',
      startTime: '',
      dueTime: '',
      currentPickerTitle: '',
      isLoading: false,
      isVisible: false,
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

  //show the time picker
  toggleShow = () => {
    this.setState((state) => ({isVisible: !state.isVisible}));
  };

  getDate = (date) => {
    if (this.state.currentPickerTitle === 'Start Date') {
      this.setState((state) => ({startTime: date}));
    } else {
      this.setState((state) => ({dueTime: date}));
    }
  };

  render() {
    if (this.state.isLoading) {
      <Loading />;
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

          <View style={cusStyles.subContainer}>
            <TouchableOpacity
              onPress={() => {
                this.toggleShow();
                this.setState((state) => ({currentPickerTitle: 'Start Date'}));
              }}>
              <Text>Start Date: {this.state.startTime}</Text>
            </TouchableOpacity>
          </View>

          <View style={cusStyles.subContainer}>
            <TouchableOpacity
              onPress={() => {
                this.toggleShow();
                this.setState((state) => ({currentPickerTitle: 'Due Date'}));
              }}>
              <Text>Due Date: {this.state.dueTime}</Text>
            </TouchableOpacity>
          </View>

          <View style={cusStyles.button}>
            <Button
              large
              // leftIcon={{ name: 'save' }}
              title="Save"
              onPress={this.saveBoard}
            />
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.button,
                // eslint-disable-next-line react-native/no-inline-styles
                {flexDirection: 'row', alignItems: 'center'},
              ]}
              onPress={() =>
                this.props.navigation.navigate('VoiceRecognitionScreen')
              }>
              <FontAwesomeIcon
                icon={faMicrophone}
                color={colors.white}
                size={24}
                style={{alignSelf: 'flex-start', marginRight: 25}}
              />
              <Text style={styles.buttonText}>Voice Recognization</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View>
          {this.state.isVisible ? (
            <TimePicker
              pickerTitle={this.state.currentPickerTitle}
              toggleShow={this.toggleShow} //passing the function to the child
              onRef={(ref) => (this.parentReference = ref)}
              parentReference={this.getDate.bind(this)}
            />
          ) : null}
        </View>
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
