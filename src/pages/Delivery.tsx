import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ing from './Ing';
import Complete from './Complete';
import {LoggedInParamList} from '../AppInner';

const Stack = createNativeStackNavigator<LoggedInParamList>();

export default function Delivery() {
  return (
    <Stack.Navigator initialRouteName="Delivery">
      <Stack.Screen
        name="Delivery"
        component={Ing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
