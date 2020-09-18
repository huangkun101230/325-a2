/*
This is the eventServices
This is been used with any scrren that requires event services
It allows user to create, remove, get event list and details from the firebase
It returns a new eventService object
*/

import firebase from '../../firebase';

class eventService {
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.eventListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  removeEvent(eventId: string): Promise<void> {
    return this.eventListRef.doc(eventId).delete();
  }

  getEventList(): firebase.firestore.CollectionReference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): firebase.firestore.DocumentReference {
    return this.eventListRef.doc(eventId);
  }
}

const EventService = new eventService();
export default EventService;
