/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/*
This is the ListScreen
It linked with PostScreen and DetailScreen
It displays all the events and allows user to swip horizontally to view events
It uses loading, circleTimer, and title compoent
It uses color and syles config form the config folder
It is using functions provided by the EventSerice
It uses the icon from fontawesome
*/

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import Title from '../components/title';
import CircleTimer from './../components/circleTimer';
import Loading from './../components/loading';
import EventService from '../services/events/event.services';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

class ListScreen extends React.Component {
  constructor() {
    super();
    this.ref = EventService.getEventList();
    this.unsubscribe = null;
    this.intervalId = null;
    this.state = {
      events: [],
      isLoading: true,
      countingForRefreshing: 0,
    };
    //counting numbers for refreshing
    this.intervalId = setInterval(() => {
      this.counting();
    }, 1000);
  }

  //counting numbers for refreshing
  counting() {
    this.setState((state) => ({
      countingForRefreshing: this.state.countingForRefreshing + 1,
    }));
  }

  //update event if there is any chages
  onCollectionUpdate = async (querySnapshot) => {
    const events = [];
    querySnapshot.forEach((doc) => {
      const {
        courseCode,
        assiTitle,
        description,
        startTime,
        dueTime,
        displayStartTime,
        displayDueTime,
        backgroundColor,
      } = doc.data();
      events.push({
        key: doc.id,
        doc, // DocumentSnapshot
        courseCode,
        assiTitle,
        description,
        startTime,
        dueTime,
        displayStartTime,
        displayDueTime,
        backgroundColor,
      });
    });
    this.setState({
      events,
      isLoading: false,
    });
  };

  //set up subscription with event colletcion update
  componentDidMount = () => {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  };

  // fix Warning: Can't perform a React state update on an unmounted component
  //return null when escapse component, it will no longer hold any data in memory
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
    clearInterval(this.intervalId);
  };

  //render each event insaid the horizontal list
  renderList = (list) => {
    let stringPercent, fillColor, percent, remainingTime;
    //change the time from seconds to millisecionds
    const endTime = list.dueTime.seconds * 1000;
    const startTime = list.startTime.seconds * 1000;
    const totalTime = endTime - startTime;

    let now = new Date().getTime();

    //set time restrictions
    let diffNowAndEnd = endTime - now;
    if (now < startTime) {
      remainingTime = totalTime;
    } else if (now < endTime && now >= startTime) {
      remainingTime = diffNowAndEnd;
    } else {
      remainingTime = 0;
    }

    //set color restrictions
    percent = (remainingTime / totalTime) * 100;
    stringPercent = parseInt(percent.toString()).toString();
    if (percent <= 100 && percent >= 66) {
      fillColor = colors.green;
    } else if (percent < 66 && percent >= 33) {
      fillColor = colors.yellow;
    } else {
      fillColor = colors.red;
    }

    //display timeCircleProgress bar, coursecode, title and due date of the events.
    return (
      <TouchableOpacity
        style={[
          cusStyles.listContainer,
          {backgroundColor: list.backgroundColor},
        ]}
        onPress={() => {
          //passing this event key to the detailScreen
          this.props.navigation.navigate('DetailScreen', {
            itemKey: list.key,
          });
        }}>
        <Text style={styles.courseCode} numberOfLines={1}>
          {list.courseCode}
        </Text>

        <Text style={[styles.assiTitle, {marginBottom: 10}]}>
          {list.assiTitle}
        </Text>

        <CircleTimer
          backgroundColor={list.backgroundColor}
          fillColor={fillColor}
          percent={percent}
          stringPercent={stringPercent}
        />

        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text style={styles.time}>Due date:</Text>
          <Text style={styles.time}>{list.displayDueTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    //show the loading avtivity indicator if it's loading
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <View style={cusStyles.container}>
        <Title />
        <View style={{marginVertical: 48}}>
          {/* add event button */}
          <TouchableOpacity
            style={cusStyles.addList}
            onPress={() => this.props.navigation.navigate('PostScreen')}>
            <FontAwesomeIcon
              icon={faPlus}
              color={colors.secondary}
              size={16}
              style={{
                shadowColor: colors.primary,
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 10,
                shadowOpacity: 0.3,
              }}
            />
          </TouchableOpacity>
          <Text style={cusStyles.add}>Add Task</Text>
        </View>

        {/* reanding each event in the flatList */}
        <View style={{height: 275, paddingLeft: 32}}>
          <FlatList
            data={this.state.events}
            extraData={this.state.countingForRefreshing}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => this.renderList(item)}
          />
        </View>
      </View>
    );
  }
}

const cusStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
    marginTop: 8,
  },
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
});

export default ListScreen;
