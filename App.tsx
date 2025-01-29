import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AppInner from './src/AppInner.tsx';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
PushNotification.configure({
  onRegister: function (token: any) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification: any) {
    console.log('NOTIFICATION:', notification);
    if (notification.channelId === 'riders') {
      // if (notification.message || notification.data.message) {
      //   store.dispatch(
      //     userSlice.actions.showPushPopup(
      //       notification.message || notification.data.message,
      //     ),
      //   );
      // }
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification: any) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err: Error) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});
PushNotification.createChannel(
  {
    channelId: 'riders',
    channelName: '앱 전반',
    channelDescription: '앱 실행하는 알림',
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created: boolean) =>
    console.log(`createChannel riders returned '${created}'`),
);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
