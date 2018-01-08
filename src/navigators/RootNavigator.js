import { StackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import WalkthroughScreen from '../screens/WalkthroughScreen'
import ListScreen from '../screens/ListScreen'
import CreateScreen from '../screens/CreateScreen'

import { MainDrawer } from './MainDrawer'

const RootNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUpScreen },
  WalkthroughScreen: { screen: WalkthroughScreen },

  MainDrawer: { screen: MainDrawer },

  ListScreen: { screen: ListScreen },
  CreateScreen: { screen: CreateScreen },
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none'
})

export { RootNavigator }
