import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  List,
  ListItem,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import EventService from '../services/events/event.services';

class ListScreen extends React.Component {
  constructor() {
    super();
    this.ref = EventService.getEventList();
    this.unsubscribe = null;
    this.state = {
      events: [],
      isLoading: true,
    };
  }

  onCollectionUpdate = async (querySnapshot) => {
    const events = [];
    querySnapshot.forEach((doc) => {
      const {
        courseCode,
        assiTitle,
        description,
        startTime,
        dueTime,
      } = doc.data();
      events.push({
        key: doc.id,
        doc, // DocumentSnapshot
        courseCode,
        assiTitle,
        description,
        startTime,
        dueTime,
      });
    });
    this.setState({
      events,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  // fix Warning: Can't perform a React state update on an unmounted component
  //return null when escapse component, it will no longer hold any data in memory
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  renderList = (list) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          this.props.navigation.navigate('DetailScreen', {
            itemKey: list.key,
          });
        }}>
        <Text style={styles.courseCode}>{list.courseCode}</Text>
        <Text style={styles.assiTitle}>{list.assiTitle}</Text>
        <Text style={styles.assiTitle}>Due date: {list.dueTime}</Text>
      </TouchableOpacity>
    );
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Assignment</Text>
        </View>

        <FlatList
          style={styles.list}
          data={this.state.events}
          renderItem={({item}) => this.renderList(item)}
        />
      </View>
    );
  }
}

export default ListScreen;
