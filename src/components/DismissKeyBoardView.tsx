import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
export default function DismissKeyboardView({children, ...props}: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        {...props}
        style={props.style}
        behavior={Platform.OS === 'android' ? 'position' : 'padding'}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
