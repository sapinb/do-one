import { StackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import WalkthroughScreen from '../screens/WalkthroughScreen'

const RootNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUpScreen },
  WalkthroughScreen: { screen: WalkthroughScreen },
}, {
  initialRouteName: 'WalkthroughScreen',
  headerMode: 'none'
})

export { RootNavigator }
