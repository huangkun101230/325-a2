/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/*
This is the VoiceRecognitionScreen
This is been linked with postScreen
It allows user to use the voiceRecognition within two different languages, English and Chinese
It uses color config form the config folder
It uses the icon from fontawesome
*/

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import colors from './../configs/colors';
import Voice from 'react-native-voice';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMicrophone,
  faTrashAlt,
  faClone,
  faStop,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

class VoiceRecognition extends React.Component {
  state = {
    pitch: '', //detect volumn changed
    error: '',
    results: [], //final results
    partialResults: [], //when speak stops, it is a partialResults
    isReco: false, //if it is listening
    isEnglish: true,
    currentLanguage: 'en-US', // zh-CN
    currentResults: '',
  };

  constructor(props) {
    super(props);
    //Setting callbacks for the process status
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
  }

  //change the state for showing the time voiceReco or not
  toggleVoiceReco = () => {
    this.setState((state) => ({isReco: !state.isReco}));
  };

  //change the state for the language toggle and also change the current language
  toggleIsEnglish = () => {
    this.setState((state) => ({isEnglish: !state.isEnglish}));
    this.toggleLanguage();
  };

  //change current language
  toggleLanguage = () => {
    this.state.isEnglish
      ? this.setState((state) => ({currentLanguage: 'zh-CN'}))
      : this.setState((state) => ({currentLanguage: 'en-US'}));
  };

  componentWillUnmount() {
    //destroy the process after switching the screen
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechError = (e) => {
    //invoked when an error occurs.
    // console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    //invoked when SpeechRecognizer is finished recognizing
    // console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e) => {
    //invoked when any results are computed
    // console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    //invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e.value);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    //starts listening for speech for a specific locale
    this.setState({
      pitch: '',
      error: '',
      results: [],
      partialResults: [],
      isReco: true,
    });
    try {
      await Voice.start(this.state.currentLanguage);
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    //stops listening for speech
    this.setState({
      isReco: false,
    });

    try {
      await Voice.stop();
      alert('Reco Stopped');
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    //destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      pitch: '',
      error: '',
      results: [],
      partialResults: [],
      isReco: false,
    });
  };

  playButton = () => {
    return (
      <View>
        <TouchableHighlight
          onPress={this._startRecognizing}
          style={{marginVertical: 20}}>
          <FontAwesomeIcon
            icon={faMicrophone}
            color={colors.primary}
            size={81}
            style={{alignSelf: 'center'}}
          />
        </TouchableHighlight>
        <Text
          style={{
            textAlign: 'center',
            color: '#B0171F',
            marginBottom: 1,
            fontWeight: '700',
          }}>
          Press mike to start Recognition
        </Text>
      </View>
    );
  };

  stopButton = () => {
    return (
      <View>
        <TouchableHighlight
          onPress={this._stopRecognizing}
          style={{marginVertical: 20}}>
          <FontAwesomeIcon
            icon={faStop}
            color={colors.red}
            size={81}
            style={{alignSelf: 'center'}}
          />
        </TouchableHighlight>
        <Text
          style={{
            textAlign: 'center',
            color: '#B0171F',
            marginBottom: 1,
            fontWeight: '700',
          }}>
          Press to stop
        </Text>
      </View>
    );
  };

  //give an alert and passing the reco data to the postScreen.
  copyText = () => {
    alert('Reco copied');
    this.props.copyToParent(this.state.results);
  };

  getStatus = (status) => {
    this.setState((state) => ({isEnglish: status}));
  };

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        {/* top right closing button */}
        <TouchableOpacity
          style={{position: 'absolute', top: 64, right: 32}}
          onPress={this.props.closeModal}>
          <FontAwesomeIcon icon={faTimes} color={colors.black} size={24} />
        </TouchableOpacity>

        <View style={{flex: 1, marginTop: 100}}>
          {/* top language toggle */}
          <View style={cusStyles.container}>
            <Text style={{marginBottom: 8}}>Choose your language: </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={cusStyles.label}>
                {this.state.isEnglish ? (
                  <Text>English</Text>
                ) : (
                  <Text>Chinese</Text>
                )}
              </View>
              <Switch
                trackColor={{false: colors.shadow, true: colors.primary}}
                thumbColor={this.state.isEnglish ? colors.white : colors.yellow}
                ios_backgroundColor={colors.red}
                onValueChange={this.toggleIsEnglish}
                value={this.state.isEnglish}
              />
            </View>
          </View>

          <Text style={styles.stat}>Results</Text>
          <ScrollView>
            {this.state.results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat} selectable>
                  {result}
                </Text>
              );
            })}
          </ScrollView>
          <ScrollView>
            {this.state.isReco ? this.stopButton() : this.playButton()}
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'space-between',
              position: 'absolute',
              bottom: 0,
            }}>
            <TouchableHighlight //copy button
              onPress={this.copyText}
              style={{flex: 1, backgroundColor: 'grey', padding: 10}}>
              <FontAwesomeIcon
                icon={faClone}
                color={colors.white}
                size={40}
                style={{alignSelf: 'center'}}
              />
            </TouchableHighlight>
            <TouchableHighlight //delete button
              onPress={this._destroyRecognizer}
              style={{flex: 1, backgroundColor: 'red', padding: 10}}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                color={colors.white}
                size={40}
                style={{alignSelf: 'center'}}
              />
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const cusStyles = StyleSheet.create({
  container: {
    flex: 0,
    paddingVertical: 8,
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
  },
});

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    marginLeft: 35,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 30,
  },
  iconButton: {
    width: 80,
    height: 80,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
  },
});
export default VoiceRecognition;
