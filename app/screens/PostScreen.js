/* eslint-disable react-native/no-inline-styles */
/*
This is the PostScreen
This is been linked with ListScreen and VoiceRecognitionScreen
It allows user to post new event
It uses timerPicker, loading, moment compoent
It uses color and syles config form the config folder
It is using functions provided by the EventSerice
It uses the icon from fontawesome
*/

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import EventService from '../services/events/event.services';
import TimePicker from '../components/timePicker';
import Loading from './../components/loading';
import moment from 'moment';
import VoiceRecognitionScreen from './VoiceRecognitionScreen';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone, faClone} from '@fortawesome/free-solid-svg-icons';

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    //those 7 colors are for selecting event theme color
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
      startTime: '', //start time in UTC format.getTime() format
      dueTime: '',
      displayStartTime: '', //display start time in string formatted format
      displayDueTime: '',
      currentPickerTitle: '', //the current picker title which will pass to the timePicker component
      currentTime: '', //current time stored in the firebase (not the actual current time)
      backgroundColor: this.backgroundColors[0],
      isLoading: false, //for displaying the loading indicator
      isVisible: false, //for displaying the time picker
      voiceRecoVisible: false,
      copiedText: '',
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
      voiceRecoVisible: false,
    });
  }

  //seven color theme for selecting
  //this will change the this.state.backgroundColor
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

  //update textinput to specif state
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  //save a new task with the current value in the state
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
      })
      .then((docRef) => {
        this.resetState(); //reset the state elements
        // this.props.closeModal(); //close this modal
        this.props.navigation.navigate('ListScreen');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        this.setState({
          isLoading: false,
        });
      });
  };

  //change the state for showing the time picker or not
  togglePickerShow = () => {
    this.setState((state) => ({isVisible: !state.isVisible}));
  };

  //get date returned from the child time picker component
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

  //change date from UTC to sepcific display format
  formatDate = (date) => {
    return moment(date).format('MMM, Do YY HH:mm'); //format date e.g. 'Sep, 16th 2020 19:50'
  };

  /*If the courseCode != null, assiTitle != null, startTime != null, dueTime != null,
  duetime grater than start time and current time, then
  updateTask, otherwise
  give an alert
  */
  checkTextInput = () => {
    if (this.state.courseCode !== '') {
      if (this.state.assiTitle !== '') {
        if (this.state.startTime !== '') {
          if (this.state.dueTime !== '') {
            if (
              this.state.dueTime.getTime() > this.state.startTime.getTime() &&
              this.state.dueTime.getTime() > new Date().getTime()
            ) {
              this.saveTask();
            } else {
              this.alertWindow('Please select a valid due date');
            }
          } else {
            this.alertWindow('Please select due date');
          }
        } else {
          this.alertWindow('Please select start date');
        }
      } else {
        this.alertWindow('Please enter task title');
      }
    } else {
      this.alertWindow('please enter course code');
    }
  };

  //alert window will display different message with input.
  alertWindow = (text) => {
    Alert.alert(
      'Warning',
      text,
      [
        {
          text: 'Sure',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  //change the state for openning the VoiceReco or not
  toggleVoiceRecoModal = () => {
    this.setState((state) => ({voiceRecoVisible: !state.voiceRecoVisible}));
  };

  //get date returned from child time picker component
  getCopiedData = (text) => {
    this.setState((state) => ({copiedText: text.toString()}));
  };

  //set the state.description data with the copiedText data
  copyToDesc = () => {
    this.setState((state) => ({description: this.state.copiedText}));
  };

  render() {
    //show the loading avtivity indicator if it's loading
    if (this.state.isLoading) {
      <Loading />;
    }

    return (
      <KeyboardAvoidingView style={styles.centerContainer} behavior="padding">
        {/* open the voiceRecognition screen modal and passing functions to it */}
        <Modal
          animationType="slide"
          // on and off
          visible={this.state.voiceRecoVisible}
          // turn it on or off
          onRequestClose={() => this.toggleVoiceRecoModal()}>
          <VoiceRecognitionScreen
            // closeModal() is passed to the child component, it can be used there to close it
            closeModal={() => this.toggleVoiceRecoModal()}
            onRef={(ref) => (this.copyToParent = ref)}
            // copyToParent() is passed to the child component, it can be used there to pass data
            copyToParent={this.getCopiedData.bind(this)}
          />
        </Modal>

        <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
          <Text style={cusStyles.title}>Create Task List</Text>

          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholder={'Course Code'}
                autoCapitalize="characters"
                value={this.state.courseCode}
                onChangeText={(text) =>
                  this.updateTextInput(text, 'courseCode')
                }
                style={[
                  styles.input,
                  {borderColor: this.state.backgroundColor},
                ]}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholder={'Task Title'}
                value={this.state.assiTitle}
                onChangeText={(text) => this.updateTextInput(text, 'assiTitle')}
                style={[
                  styles.input,
                  {borderColor: this.state.backgroundColor},
                ]}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={'Description'}
                value={this.state.description}
                onChangeText={(description) => this.setState({description})}
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
                // copy the reco text to the description TextInput field
                onPress={() => {
                  this.copyToDesc();
                }}
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
            onPress={() => {
              this.checkTextInput();
            }}>
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
            onPress={() => this.toggleVoiceRecoModal()}>
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
              date={new Date()} //passing current date
              pickerTitle={this.state.currentPickerTitle} //current title such as start date or due date
              toggleShow={this.togglePickerShow} //passing the function to the child
              onRef={(ref) => (this.parentReference = ref)}
              parentReference={this.getDate.bind(this)} //get date data from the time picker
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
