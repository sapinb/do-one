import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { withProps } from 'recompose'

import { noop } from '../utils'
import colors from '../constants/colors'

export const HEADER_HEIGHT = 56

// height of header + status bar === amount of paddingTop needed
export const HEADER_STATUSBAR_HEIGHT = HEADER_HEIGHT + Constants.statusBarHeight

const styles = StyleSheet.create({
  touchableContainer: {
    height: HEADER_HEIGHT,
    width: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 40,
    color: colors.white,
  }
})

const TouchableHeaderIcon = ({ onPress, iconName }) =>
  <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
    <Ionicons name={iconName} style={styles.icon} />
  </TouchableOpacity>

const MenuIcon = withProps({ iconName: 'ios-menu-outline' })(TouchableHeaderIcon)
const SearchIcon = withProps({ iconName: 'ios-search-outline' })(TouchableHeaderIcon)
const ExitIcon = withProps({ iconName: 'ios-exit-outline' })(TouchableHeaderIcon)
const BackIcon = withProps({ iconName: 'ios-arrow-round-back-outline' })(TouchableHeaderIcon)
const ShareIcon = withProps({ iconName: 'ios-redo-outline' })(TouchableHeaderIcon)

export const Header = ({ onPressMenu = noop, onPressSearch = noop, style }) =>
  <View style={[{
    paddingTop: Constants.statusBarHeight,
    height: HEADER_HEIGHT + Constants.statusBarHeight,
    width: '100%',
    flexDirection: 'row',
  }, style]}>
    <MenuIcon onPress={onPressMenu} />
    <View style={{ flex: 1 }} />
    <SearchIcon onPress={onPressSearch} />
  </View>

export const AnimatedOpacityHeader = ({ backgroundOpacity, onPressMenu = noop, onPressSearch = noop, style }) =>
  <View style={[{
    paddingTop: Constants.statusBarHeight,
    height: HEADER_HEIGHT + Constants.statusBarHeight,
    width: '100%',
    flexDirection: 'row',
  }, style]}>
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.black, opacity: backgroundOpacity }]} />
    <MenuIcon onPress={onPressMenu} />
    <View style={{ flex: 1 }} />
    <SearchIcon onPress={onPressSearch} />
  </View>

export const OverviewHeader = ({ onPressMenu = noop, onPressProfile = noop, profileImageSource, hasDot, style }) =>
  <View style={[{
    paddingTop: Constants.statusBarHeight,
    height: HEADER_HEIGHT + Constants.statusBarHeight,
    width: '100%',
    flexDirection: 'row',
  }, style]}>
    <MenuIcon onPress={onPressMenu} />
    <View style={{ flex: 1 }} />
    <TouchableOpacity onPress={onPressProfile} style={styles.touchableContainer}>
      <View>
        <Image source={profileImageSource} style={{ width: 40, height: 40, borderRadius: 20 }} />
        {hasDot && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.radicalRed, position: 'absolute', top: 4, right: 4 }} />}
      </View>
    </TouchableOpacity>
  </View>

export const SettingsHeader = ({ onPressMenu = noop, onPressExit = noop, style }) =>
  <View style={[{
    paddingTop: Constants.statusBarHeight,
    height: HEADER_HEIGHT + Constants.statusBarHeight,
    width: '100%',
    flexDirection: 'row',
  }, style]}>
    <MenuIcon onPress={onPressMenu} />
    <View style={{ flex: 1 }} />
    <ExitIcon onPress={onPressExit} />
  </View>

export const AnimatedListHeader = ({ backgroundOpacity, onPressBack = noop, onPressSearch = noop, onPressShare, style }) =>
  <View style={[{
    paddingTop: Constants.statusBarHeight,
    height: HEADER_HEIGHT + Constants.statusBarHeight,
    width: '100%',
    flexDirection: 'row',
  }, style]}>
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.black, opacity: backgroundOpacity }]} />
    <BackIcon onPress={onPressBack} />
    <View style={{ flex: 1 }} />
    <ShareIcon onPress={onPressShare} />
    <SearchIcon onPress={onPressSearch} />
  </View>
