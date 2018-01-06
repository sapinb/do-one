import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Switch,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { SettingsHeader as Header } from '../components/Header'
import { BackgroundOverlay } from '../components/BackgroundOverlay'

import { noop } from '../utils'
import colors from '../constants/colors'

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

  render () {
    const { sound, notification } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Image source={require('../images/profile/me-banner.jpg')} style={{ position: 'absolute', top: 0, width: '100%', height: 240, resizeMode: 'cover' }} />
        <BackgroundOverlay />
        <ScrollView
          stickyHeaderIndices={[0]}
          style={{ flex: 1 }}
        >
          <Header onPressMenu={this.openMenu} />
          <View style={{ height: 160, justifyContent: 'flex-end' }}>
            <Text style={{ color: colors.white, fontSize: 36, padding: 20 }}>Nicole James</Text>
          </View>
          <SettingItem title='General' />
          <SettingSwitch title='Notification' value={notification} onValueChange={this.onChangeNotification} />
          <SettingSwitch title='Sound' value={sound} onValueChange={this.onChangeSound} />
          <SettingItem title='Theme' value='Standard' />
          <SettingItem title='Support' />
          <SettingItem title='Privacy' />
          <SettingItem title='Logout' />
        </ScrollView>
      </View>
    )
  }
}

export default SettingsScreen
