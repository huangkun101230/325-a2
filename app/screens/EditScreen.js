/* eslint-disable react-native/no-inline-styles */
/*
This is the EditScreen
This is been linked with DetailScreen and accessed eventID from it.
It allows user to modify event details
It uses timerPicker, loading, moment compoent
It uses color and syles config form the config folder
It is using functions provided by the EventSerice
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
} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import Loading from './../components/loading';
import TimePicker from '../components/timePicker';
import moment from 'moment';
import EventService from '../services/events/event.services';

class EditScreen extends React.Component {
  constructor() {
    super();
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
      isLoading: true, //for displaying the loading indicator
      isVisible: false, //for displaying the time picker
      key: '', //current event key/id
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
      currentTime: '',
      isLoading: true,
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

  //show the time picker
  //change this.state.isVisible
  togglePickerShow = () => {
    this.setState((state) => ({isVisible: !state.isVisible}));
  };

  //get date returned from child time picker component
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

  /**
   * get the exisiting data from the firebase EventService
   * read the document referred by this documentReference (id passed from DetailScreen) and wait for OK signal
   * @param {object} doc - specificEventSnapshot data used after exists
   */
  componentDidMount() {
    const itemKey = this.props.route.params.itemKey;
    EventService.getEventDetail(itemKey)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const event = doc.data();
          this.setState({
            courseCode: event.courseCode,
            assiTitle: event.assiTitle,
            description: event.description,
            startTime: new Date(event.startTime.seconds * 1000),
            dueTime: new Date(event.dueTime.seconds * 1000),
            displayStartTime: event.displayStartTime,
            displayDueTime: event.displayDueTime,
            backgroundColor: event.backgroundColor,
            key: doc.id,
            isLoading: false,
          });
        } else {
          console.log('No such document!');
        }
      });
  }

  //update textinput to specif state
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  //update details with the current value in the state
  updateTask() {
    this.setState({
      isLoading: true,
    });
    const updateRef = EventService.getEventDetail(this.state.key);
    updateRef
      .set({
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
        this.resetState();
        this.props.navigation.navigate('ListScreen');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        this.setState((state) => ({
          isLoading: false,
        }));
      });
  }

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
              this.updateTask();
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

  render() {
    //show the loading avtivity indicator if it's loading
    if (this.state.isLoading) {
      <Loading />;
    }

    //the following will display the details of the event, such as course code, assi titile, description, etc.
    return (
      <KeyboardAvoidingView style={styles.centerContainer} behavior="padding">
        <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
          <Text style={cusStyles.title}>Modify Your Task</Text>

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
                onChangeText={(text) =>
                  this.updateTextInput(text, 'description')
                }
                style={[
                  styles.input,
                  {borderColor: this.state.backgroundColor},
                ]}
              />
            </View>

            <TouchableOpacity
              style={[styles.input, {borderColor: this.state.backgroundColor}]}
              onPress={() => {
                this.togglePickerShow();
                this.setState((state) => ({
                  currentPickerTitle: 'Start Date',
                  currentTime: this.state.startTime,
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
                this.setState((state) => ({
                  currentPickerTitle: 'Due Date',
                  currentTime: this.state.dueTime,
                }));
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
            <Text style={styles.buttonText}>Update!</Text>
          </TouchableOpacity>
        </View>

        <View>
          {this.state.isVisible ? (
            <TimePicker
              date={this.state.currentTime} //passing existing date
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

export default EditScreen;
