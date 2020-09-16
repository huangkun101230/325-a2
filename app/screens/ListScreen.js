/* eslint-disable react-native/no-inline-styles */
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
  Modal,
} from 'react-native';
import colors from '../configs/colors';
import styles from '../configs/styles';
import Title from '../components/title';
import PostScreen from './PostScreen';
import EventService from '../services/events/event.services';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

class ListScreen extends React.Component {
  constructor() {
    super();
    this.ref = EventService.getEventList();
    this.unsubscribe = null;
    this.state = {
      events: [],
      isLoading: true,
      addTodoVisible: false,
    };
  }

  toggleAddTodoModal() {
    this.setState((state) => ({addTodoVisible: !state.addTodoVisible}));
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
        displayStartTime,
        displayDueTime,
        color,
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
        color,
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
        style={[cusStyles.listContainer, {backgroundColor: list.color}]}
        onPress={() => {
          this.props.navigation.navigate('DetailScreen', {
            itemKey: list.key,
          });
        }}>
        <Text style={styles.courseCode} numberOfLines={1}>
          {list.courseCode}
        </Text>

        <Text style={styles.assiTitle}>{list.assiTitle}</Text>

        <View style={{alignItems: 'center', marginTop: 130}}>
          <Text style={styles.time}>Due date:</Text>
          <Text style={styles.time}>{list.displayDueTime}</Text>
        </View>
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
      <View style={cusStyles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}>
          <PostScreen closeModal={() => this.toggleAddTodoModal()} />
        </Modal>

        <Title />
        <View style={{marginVertical: 48}}>
          <TouchableOpacity
            style={cusStyles.addList}
            onPress={() => this.toggleAddTodoModal()}>
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

        <View style={{height: 275, paddingLeft: 32}}>
          <FlatList
            data={this.state.events}
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
