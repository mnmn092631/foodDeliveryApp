import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AppInner from './src/AppInner.tsx';
import CodePush, {CodePushOptions} from 'react-native-code-push';
import {useEffect} from 'react';

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

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

function App() {
  useEffect(() => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {
          mandatoryUpdateMessage:
            '필수 업데이트가 있어 설치 후 앱을 재시작합니다.',
          mandatoryContinueButtonLabel: '재시작',
          optionalIgnoreButtonLabel: '나중에',
          optionalInstallButtonLabel: '재시작',
          optionalUpdateMessage: '업데이트가 있습니다. 설치하시겠습니까?',
          title: '업데이트 안내',
        },
      },
      status => {
        console.log(`Changed ${status}`);
      },
    ).then(status => {
      console.log(`CodePush ${status}`);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default CodePush(codePushOptions)(App);
