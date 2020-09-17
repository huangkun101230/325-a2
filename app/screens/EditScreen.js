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
import Loading from './../components/loading';
import TimePicker from '../components/timePicker';
import moment from 'moment';
import EventService from '../services/events/event.services';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone, faClone} from '@fortawesome/free-solid-svg-icons';

class EditScreen extends React.Component {
  constructor() {
    super();
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
      startTime: '',
      dueTime: '',
      displayStartTime: '',
      displayDueTime: '',
      currentPickerTitle: '',
      currentTime: '',
      backgroundColor: this.backgroundColors[0],
      isLoading: true,
      isVisible: false,
      key: '',
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

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

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
    if (this.state.isLoading) {
      <Loading />;
    }

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
                value={this.state.assiTitle}
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
              date={this.state.currentTime}
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

export default EditScreen;
