import { Alert } from 'react-native'

export const noop = () => {}

export const showLogoutAlert = (onPressLogout) =>
  Alert.alert(
    'Log Out',
    'Are you sure you want to log out?',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Log Out', onPress: onPressLogout}
    ]
  )
