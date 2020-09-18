# swen325-a2

### Assignment Manager App

This is an Assignment Manager mobile app for the second assignment of SWEN325 [Software Development for Mobile Platforms]
My name is Kun Huang (300291127), and I accomplished this assignment by myslef.

### File structure
<pre>
--app
  |--components
  |  --circleTimer.js //progress display in circle 
  |  --loading.js //loading component
  |  --timerPicker.js //date picker
  |  --title.js   //main title
  |
  |--configs
  |  --colors.js  //all colors
  |  --styles.js  //main styles
  |
  |--Navigator    //handle transfer between screens
  |  --AppNavigator.js  //main navigator
  |  --AuthNavigator.js //user auth screens
  |  --HomeNavigator.js //main function screens
  |  --SwitchNavigator.js //switch to user auth/main function screens
  |
  |--screens
  |  --DetailScreen.js
  |  --EditScreen.js
  |  --ListScreen.js
  |  --LoadingScreen.js
  |  --LoginScreen.js
  |  --PostScreen.js
  |  --ProfileScreen.js
  |  --RegisterScreen.js
  |  --VoicRecognitionScreen.js
  |
  |--services
  |  --events
  |    --events.services.js //firebase event services
  |  --users
  |    --auth.services.js //firebase auth services
  |    --profile.services.js  //firebase user profile services
  |
  |--firebase.js    //firebase main config
  |
  |--googleLogin.js   //google auth main config
--App.js
--README.md
</pre>

### How to run my app

This app uses the react native framework.

<pre>
System:
    OS: macOS 10.15.6
    CPU: (4) x64 Intel(R) Core(TM) i5-5287U CPU @ 2.90GHz
    Memory: 1.03 GB / 16.00 GB
    Shell: 5.7.1 - /bin/zsh

  Binaries:
    Node: 14.7.0 - /usr/local/bin/node
    Yarn: 1.22.5 - ~/.yarn/bin/yarn
    npm: 6.14.8 - /usr/local/bin/npm
    Watchman: 4.9.0 - /usr/local/bin/watchman

  Managers:
    CocoaPods: 1.9.3 - /usr/local/bin/pod

  SDKs:
    iOS SDK:
      Platforms: iOS 13.7, DriverKit 19.0, macOS 10.15, tvOS 13.4, watchOS 6.2
    Android SDK:
      API Levels: 29
      Build Tools: 28.0.3, 29.0.2
      System Images: android-22 | Google APIs Intel x86 Atom_64, android-29 | Intel x86 Atom_64, android-29 | Google APIs Intel x86 Atom, android-29 | Google Play Intel x86 Atom
      Android NDK: Not Found

  IDEs:
    Android Studio: 4.0 AI-193.6911.18.40.6626763
    Xcode: 11.7/11E801a - /usr/bin/xcodebuild

  Languages:
    Java: 1.8.0_265 - /usr/bin/javac
    Python: 2.7.16 - /usr/bin/python

  npmPackages:
    @react-native-community/cli: Not Found
    react: 16.13.1 => 16.13.1 
    react-native: 0.63.2 => 0.63.2 
    react-native-macos: Not Found

  npmGlobalPackages:
    *react-native*: Not Found
</pre>

1. Clone the git repository
<pre>
git clone https://github.com/huangkun101230/325-a2.git
</pre>

2. Navigate into the folder
<pre>
cd 325-a2
</pre>

3. Install dependencies
<pre>
npm install
</pre>

4. Install pods
<pre>
cd ios
pod install
cd ..
</pre>

5. Run the application in your ios simulator
<pre>
yarn ios
</pre>

6. Enjoy!

### External components
<pre>
The firebase is used for user authentication and cloud storage. https://firebase.google.com/
The React Native VOice is used for the voice recognition function.  https://github.com/jamsch/react-native-voice
The React Native Progress Circle is used for counting down the remainning time for each event. https://github.com/MrToph/react-native-progress-circle#readme
The react-native-modal-datetime-picker is used for time picking.  https://github.com/mmazzarolo/react-native-modal-datetime-picker
</pre>

### Screens and functions 
* LoginScreen
  * Firestore access: Login function
  * Jump link: RegisterScreen
  * Google access: Login function
  * Styling
  
* RegisterScreen
  * Firestore access: Signup function
  * Providing a email keyboard for user
  * Providing a password keybaord for user
  * Auto capitalize the first letter for the name input
  * Styling

* ListScreen
  * React Native Progress Circle: package implementation
  * Firestore access: Realtime update for getting the new event list && details
  * Jump link: PostScreen 
  * Styling
  
* PostScreen
  * Firestore access: Adding a new event
  * Selecting theme color
  * Jump link: Voice Recognization Screen
  * Copy Voice Recognized text to description input filed
  * Styling
  
* DetailScreen
  * Firestore access: Get event details with specific event id
  * Remove event function
  * Jump link: EditScreen
  * Styling

* EditScreen
  * Firestore access: Get event details with specific event id
  * Firestore access: Update the event details
  * Selecting theme color
  * Styling
  
* ProfileScreen
  * Firestore access: Realtime update for getting the new user's details
  * Firesotre access: Logout function
  * Styling

* VoiceRecognitionScreen
  * Voice recognation function
  * Start/Stop voice recognation function
  * Language switch function: English to Chinese
  * Copiable recognition text
  * Copy funtion
  * Remove current recognition text function
  * Styling

* LoadingScreen
  * Styling
  
  
### Components used
1. React
2. StyleSheet
3. Text
4. View,
5. TouchableOpacity,
6. ScrollView,
7. Alert,
8. KeyboardAvoidingView,
9. FlatList,
10. ActivityIndicator,
11. DateTimePickerModal,
12. TextInput,
13. ProgressCircle,
14. FontAwesomeIcon,
15. Modal,
16. VoiceRecognition
17. Switch
18. TouchableHighlight
19. useEffect


### Future works
* Applying this mobile app on Android
* Optimizing the sytle of the profile page
* Adding a past event list
* Allow user to continue with Google account
* Allow users to set the event remainder by themselves
* Allow users to change the order of the events
* Allow user to view most of pages without authentication