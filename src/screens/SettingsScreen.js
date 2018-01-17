import React from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Switch,
  Animated,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import { StyledText as Text } from '../components/StyledText'
import { resetTo } from '../navigators/navigationActions'
import { AnimatedSettingsHeader as Header } from '../components/Header'
import { BackgroundImage } from '../components/BackgroundImage'

import { noop, showLogoutAlert } from '../utils'
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
  _animatedValue = new Animated.Value(0)

  state = {
    notification: true,
    sound: false,
  }

  onChangeSound = sound => this.setState({ sound })
  onChangeNotification = notification => this.setState({ notification })

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  logOut = () => {
    showLogoutAlert(() => this.props.navigation.dispatch(resetTo({ routeName: 'LoginScreen' })))
  }

  renderForeground = () =>
    <View style={{ height: 240, justifyContent: 'flex-end' }}>
      <Text style={{ color: colors.white, fontSize: 36, padding: 20 }}>Nicole James</Text>
    </View>

  renderBackground = () => <BackgroundImage source={profilePics.myBanner()} opacity={0.25} />

  render () {
    const { sound, notification } = this.state

    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 60, 160, 170],
      outputRange: [0, 0, 0.5, 0.5],
    })

    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundOpacity={backgroundOpacity}
          onPressMenu={this.openMenu}
          onPressLogout={this.logOut}
          style={{ position: 'absolute', top: 0, zIndex: 1 }}
        />
        <ParallaxScrollView
          animatedScrollY={this._animatedValue}
          parallaxHeaderHeight={240}
          renderForeground={this.renderForeground}
          renderBackground={this.renderBackground}
          fadeOutForeground={false}
        >
          <SettingItem title='General' />
          <SettingSwitch title='Notification' value={notification} onValueChange={this.onChangeNotification} />
          <SettingSwitch title='Sound' value={sound} onValueChange={this.onChangeSound} />
          <SettingItem title='Theme' value='Standard' />
          <SettingItem title='Support' />
          <SettingItem title='Privacy' />
          <SettingItem title='Logout' onPress={this.logOut} />

        </ParallaxScrollView>
      </View>
    )
  }
}

export default SettingsScreen
