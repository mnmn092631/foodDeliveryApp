declare module 'react-native-keyboard-aware-scrollview' {
  import * as React from 'react';
  import {Constructor} from 'react-native';

  class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> {}
  const keyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent &
    Constructor<any>;
  class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}
  export {KeyboardAwareScrollView};
}
