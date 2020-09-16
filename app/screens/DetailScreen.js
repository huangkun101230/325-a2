import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import colors from '../configs/colors';
import styles from '../configs/styles';
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

  componentDidMount() {
    const itemKey = this.props.route.params.itemKey;
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

  handleEdit = () => {
    this.props.navigation.navigate('EditScreen');
  };

  handleRemove = () => {
    EventService.removeEvent(this.state.key);
    this.props.navigation.navigate('ListScreen');
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
      <ScrollView
        style={[styles.container, {backgroundColor: this.state.event.color}]}>
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
                Start Time: {this.state.event.startTime}
              </Text>
            </View>
            <View>
              <Text style={[styles.time, {fontSize: 20}]}>
                Due Time: {this.state.event.dueTime}
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
              onPress={this.handleRemove}>
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
