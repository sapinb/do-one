import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { withProps } from 'recompose'

import { noop } from '../utils'
import colors from '../constants/colors'

const HEADER_HEIGHT = 56

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

export const Header = ({ onPressMenu = noop, onPressSearch = noop }) =>
  <View style={{
    paddingTop: Constants.statusBarHeight,
    height: HEADER_HEIGHT + Constants.statusBarHeight,
    width: '100%',
    flexDirection: 'row',
  }}>
    <MenuIcon onPress={onPressMenu} />
    <View style={{ flex: 1 }} />
    <SearchIcon onPress={onPressSearch} />
  </View>

export const AnimatedOpacityHeader = ({ backgroundOpacity, onPressMenu = noop, onPressSearch = noop }) =>
  <View style={{
    paddingTop: Constants.statusBarHeight,
    height: HEADER_HEIGHT + Constants.statusBarHeight,
    width: '100%',
    flexDirection: 'row',
  }}>
    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.black, opacity: backgroundOpacity }]} />
    <MenuIcon onPress={onPressMenu} />
    <View style={{ flex: 1 }} />
    <SearchIcon onPress={onPressSearch} />
  </View>
