/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import EventService from '../services/events/event.services';
import TimePicker from '../components/timePicker';
import Loading from './../components/loading';
import moment from 'moment';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMicrophone,
  faTimes,
  faClone,
} from '@fortawesome/free-solid-svg-icons';

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.backgroundColors = [
      '#5cd859',
      '#24a6d9',
      '#595bd9',
      '#8022d9',
      '#d159d8',
      '#d85963',
      '#d88559',
    ];
    this.ref = EventService.getEventList();
    this.state = {
      courseCode: '',
      assiTitle: '',
      description: '',
      startTime: '',
      dueTime: '',
      displayStartTime: '',
      displayDueTime: '',
      currentPickerTitle: '',
      currentTime: '',
      percent: '',
      fillColor: '',
      backgroundColor: this.backgroundColors[0],
      isLoading: false,
      isVisible: false,
    };
  }

  resetState() {
    this.setState({
      courseCode: '',
      assiTitle: '',
      description: '',
      startTime: '',
      dueTime: '',
      displayStartTime: '',
      displayDueTime: '',
      isLoading: false,
    });
  }

  renderColors() {
    return this.backgroundColors.map((backgroundColor) => {
      return (
        <TouchableOpacity
          key={backgroundColor}
          style={[cusStyles.colorSelect, {backgroundColor: backgroundColor}]}
          onPress={() => this.setState({backgroundColor})}
        />
      );
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  saveTask = () => {
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
        displayStartTime: this.state.displayStartTime,
        displayDueTime: this.state.displayDueTime,
        backgroundColor: this.state.backgroundColor,
        percent: '',
        fillColor: '',
      })
      .then((docRef) => {
        this.resetState(); //reset the state elements
        this.props.closeModal(); //close this modal
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        this.setState({
          isLoading: false,
        });
      });
  };

  //show the time picker
  togglePickerShow = () => {
    this.setState((state) => ({isVisible: !state.isVisible}));
  };

  //get date returned from time picker component
  getDate = (date) => {
    const formattedDate = this.formatDate(date);
    if (this.state.currentPickerTitle === 'Start Date') {
      this.setState((state) => ({
        startTime: date,
        displayStartTime: formattedDate,
      }));
    } else {
      this.setState((state) => ({
        dueTime: date,
        displayDueTime: formattedDate,
      }));
    }
  };

  formatDate = (date) => {
    return moment(date).format('MMM, Do YY HH:mm'); //format date e.g. 'Sep, 16th 2020 19:50'
  };

  AlertWindow = (text) => {
    Alert.alert(
      'Warning',
      'You are going to remove this task',
      [
        {
          text: 'Sure',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    if (this.state.isLoading) {
      <Loading />;
    }

    return (
      <KeyboardAvoidingView style={styles.centerContainer} behavior="padding">
        <TouchableOpacity
          style={{position: 'absolute', top: 64, right: 32}}
          onPress={this.props.closeModal}>
          <FontAwesomeIcon icon={faTimes} color={colors.black} size={24} />
        </TouchableOpacity>

        <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
          <Text style={cusStyles.title}>Create Task List</Text>

          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholder={'Course Code'}
                autoCapitalize="characters"
                value={this.state.title}
                onChangeText={(text) =>
                  this.updateTextInput(text, 'courseCode')
                }
                style={[
                  styles.input,
                  {borderColor: this.state.backgroundColor},
                ]}
              />
              <FontAwesomeIcon
                icon={faClone}
                size={32}
                color={this.state.backgroundColor}
                style={{position: 'absolute', right: -28, top: 18}}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholder={'Task Title'}
                value={this.state.title}
                onChangeText={(text) => this.updateTextInput(text, 'assiTitle')}
                style={[
                  styles.input,
                  {borderColor: this.state.backgroundColor},
                ]}
              />
              <FontAwesomeIcon
                icon={faClone}
                size={32}
                color={this.state.backgroundColor}
                style={{position: 'absolute', right: -28, top: 18}}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={'Description'}
                value={this.state.description}
                onChangeText={(text) =>
                  this.updateTextInput(text, 'description')
                }
                style={[
                  styles.input,
                  {borderColor: this.state.backgroundColor},
                ]}
              />
              <FontAwesomeIcon
                icon={faClone}
                size={32}
                color={this.state.backgroundColor}
                style={{position: 'absolute', right: -28, top: 18}}
              />
            </View>

            <TouchableOpacity
              style={[styles.input, {borderColor: this.state.backgroundColor}]}
              onPress={() => {
                this.togglePickerShow();
                this.setState((state) => ({
                  currentPickerTitle: 'Start Date',
                }));
              }}>
              <Text style={[cusStyles.timeText, {color: colors.lightGray}]}>
                Start Date
              </Text>
              <Text style={cusStyles.timeText}>
                {this.state.displayStartTime}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.input, {borderColor: this.state.backgroundColor}]}
              onPress={() => {
                this.togglePickerShow();
                this.setState((state) => ({currentPickerTitle: 'Due Date'}));
              }}>
              <Text style={[cusStyles.timeText, {color: colors.lightGray}]}>
                Due Date
              </Text>
              <Text style={cusStyles.timeText}>
                {this.state.displayDueTime}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: this.state.backgroundColor},
            ]}
            onPress={this.saveTask}>
            <Text style={styles.buttonText}>Create!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() =>
              this.props.navigation.navigate('VoiceRecognitionScreen')
            }>
            <FontAwesomeIcon
              icon={faMicrophone}
              color={colors.white}
              size={24}
              style={{marginRight: 25}}
            />
            <Text style={styles.buttonText}>Voice Recognization</Text>
          </TouchableOpacity>
        </View>

        <View>
          {this.state.isVisible ? (
            <TimePicker
              date={new Date()}
              pickerTitle={this.state.currentPickerTitle}
              toggleShow={this.togglePickerShow} //passing the function to the child
              onRef={(ref) => (this.parentReference = ref)}
              parentReference={this.getDate.bind(this)}
            />
          ) : null}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const cusStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  timeText: {
    fontSize: 18,
  },
});

export default PostScreen;
