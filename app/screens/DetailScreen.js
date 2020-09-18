/* eslint-disable react-native/no-inline-styles */
/*
This is the DetailScreen
This is been linked with ListScreen and accessed eventID from it.
It allows user to remove event or edit the event (which will link to EditScreen)
It will show loading indicator when it's loading
It uses color and syles config form the config folder
It is using functions provided by the EventSerice
*/

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import colors from '../configs/colors';
import styles from '../configs/styles';
import Loading from './../components/loading';
import EventService from '../services/events/event.services';

class DetailScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      event: {},
      color: '',
      key: '',
    };
  }

  /**
   * To get the event detail, we must:
   * read the document referred by this documentReference (id passed from ListScrren) and wait for OK signal
   * @param {object} doc - specificEventSnapshot data used after exists
   */
  componentDidMount() {
    //get this event key from ListScreen
    const itemKey = this.props.route.params.itemKey;
    //get details from the EventService
    EventService.getEventDetail(itemKey)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            event: doc.data(),
            key: doc.id,
            isLoading: false,
          });
        } else {
          console.log('No such document!');
        }
      });
  }

  //jump to the Editscreen and pass this event id to that page
  handleEdit = () => {
    this.props.navigation.navigate('EditScreen', {
      itemKey: this.state.key,
    });
  };

  //remove this event and jump back to the ListScreen
  handleRemove = () => {
    EventService.removeEvent(this.state.key);
    this.props.navigation.navigate('ListScreen');
  };

  //alertWindow for removing event
  alertWindow = () => {
    Alert.alert(
      'Warning',
      'You are going to remove this task',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.handleRemove()},
      ],
      {cancelable: false},
    );
  };

  render() {
    //show the loading avtivity indicator if it's loading
    if (this.state.isLoading) {
      return <Loading />;
    }

    //the following will display the details of the event, such as course code, assi titile, description, etc.
    return (
      <ScrollView
        style={[
          styles.container,
          {backgroundColor: this.state.event.backgroundColor},
        ]}>
        <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
          <View style={cusStyles.subContainer}>
            <View>
              <Text
                style={[styles.courseCode, {fontSize: 36, marginBottom: 16}]}>
                {this.state.event.courseCode}
              </Text>
            </View>
            <View>
              <Text
                style={[styles.assiTitle, {fontSize: 30, marginBottom: 16}]}>
                {this.state.event.assiTitle}
              </Text>
            </View>
            <View>
              <Text
                style={[styles.description, {fontSize: 24, marginBottom: 16}]}>
                {this.state.event.description}
              </Text>
            </View>
            <View>
              <Text style={[styles.time, {fontSize: 20, marginBottom: 8}]}>
                Start Time: {this.state.event.displayStartTime}
              </Text>
            </View>
            <View>
              <Text style={[styles.time, {fontSize: 20}]}>
                Due Time: {this.state.event.displayDueTime}
              </Text>
            </View>
          </View>

          <View style={(styles.container, {flex: 1})}>
            <TouchableOpacity style={styles.button} onPress={this.handleEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={(styles.container, {flex: 1})}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: colors.red}]}
              //will pop up an alert window if you want to remove it
              onPress={this.alertWindow}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const cusStyles = StyleSheet.create({
  subContainer: {
    borderRadius: 5,
    padding: 8,
    margin: 8,
  },
  assiTitle: {
    fontSize: 20,
    marginTop: 10,
  },
  time: {
    fontSize: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
  },
});

export default DetailScreen;
