import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Switch,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { resetTo } from '../navigators/navigationActions'
import { SettingsHeader as Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'
import { BackgroundOverlay } from '../components/BackgroundOverlay'

import { noop } from '../utils'
import colors from '../constants/colors'
import profilePics from '../images/profilePics'

const styles = StyleSheet.create({
  settingItemContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomColor: '#888',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingItemTitle: {
    flex: 1,
  },
  settingItemValue: {
    color: colors.gray50,
    paddingRight: 10,
  }
})

const SettingItem = ({ title, value = null, onPress = noop }) =>
  <TouchableHighlight underlayColor={colors.gray50} onPress={onPress}>
    <View style={styles.settingItemContainer}>
      <Text style={styles.settingItemTitle}>{title}</Text>
      {value && <Text style={styles.settingItemValue}>{value}</Text>}
      <Ionicons name='ios-arrow-forward' style={{ fontSize: 40, color: colors.gray50 }} />
    </View>
  </TouchableHighlight>

const SettingSwitch = ({ title, value, onValueChange }) =>
  <View style={styles.settingItemContainer}>
    <Text style={styles.settingItemTitle}>{title}</Text>
    <Switch onTintColor={colors.radicalRed50} value={value} onValueChange={onValueChange} thumbTintColor={value ? colors.radicalRed : colors.gray25} />
  </View>

class SettingsScreen extends React.Component {
  state = {
    notification: true,
    sound: false,
  }

  onChangeSound = sound => this.setState({ sound })
  onChangeNotification = notification => this.setState({ notification })

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  logOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Log Out', onPress: () => this.props.navigation.dispatch(resetTo({ routeName: 'LoginScreen' }))}
      ]
    )
  }

  render () {
    const { sound, notification } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Image source={profilePics.myBanner()} style={{ position: 'absolute', top: 0, width: '100%', height: 240, resizeMode: 'cover' }} />
        <BackgroundOverlay />
        <Header
          onPressMenu={this.openMenu}
          onPressLogout={this.logOut}
          style={{ position: 'absolute', top: 0, zIndex: 1 }}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: HEADER_STATUSBAR_HEIGHT }}
        >
          <View style={{ height: 160, justifyContent: 'flex-end' }}>
            <Text style={{ color: colors.white, fontSize: 36, padding: 20 }}>Nicole James</Text>
          </View>
          <SettingItem title='General' />
          <SettingSwitch title='Notification' value={notification} onValueChange={this.onChangeNotification} />
          <SettingSwitch title='Sound' value={sound} onValueChange={this.onChangeSound} />
          <SettingItem title='Theme' value='Standard' />
          <SettingItem title='Support' />
          <SettingItem title='Privacy' />
          <SettingItem title='Logout' onPress={this.logOut} />
        </ScrollView>
      </View>
    )
  }
}

export default SettingsScreen
