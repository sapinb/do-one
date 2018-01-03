import { StackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

const RootNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUpScreen },
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none'
})

export { RootNavigator }
