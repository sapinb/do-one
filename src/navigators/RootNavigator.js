import { StackNavigator } from 'react-navigation'

import { LoginScreen } from '../screens/LoginScreen'

const RootNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none'
})

export { RootNavigator }
