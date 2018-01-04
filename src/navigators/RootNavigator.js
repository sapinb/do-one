import { StackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import WalkthroughScreen from '../screens/WalkthroughScreen'
// import HomeScreen from '../screens/HomeScreen'

import { MainDrawer } from './MainDrawer'

const RootNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUpScreen },
  WalkthroughScreen: { screen: WalkthroughScreen },
  MainDrawer: { screen: MainDrawer }
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none'
})

export { RootNavigator }
