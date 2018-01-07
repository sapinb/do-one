import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'
import { BackgroundOverlay } from '../components/BackgroundOverlay'
import { PLUS_BUTTON_HEIGHT, PLUS_BUTTON_HALF_HEIGHT } from '../components/PlusButton'

import colors from '../constants/colors'
import profilePics from '../images/profilePics'
import { noop } from '../utils/index'

const styles = StyleSheet.create({
  moreButton: {
    width: PLUS_BUTTON_HEIGHT,
    height: PLUS_BUTTON_HEIGHT,
    borderRadius: PLUS_BUTTON_HALF_HEIGHT,
    backgroundColor: colors.radicalRed,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  moreButtonIcon: {
    color: colors.white,
    fontSize: 32,
  },
})

const MonthSelector = ({ month, year, onPressDown = noop }) =>
  <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', paddingHorizontal: 20 }}>
    <Text style={{ color: colors.black }}>{month}</Text>
    <Text style={{ color: colors.gray50, paddingLeft: 5 }}>{year}</Text>
    <TouchableOpacity onPress={onPressDown} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name='ios-arrow-down' style={{ fontSize: 20, color: colors.gray50 }} />
    </TouchableOpacity>
  </View>

class ProfileScreen extends React.Component {
  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Image source={profilePics.myBanner()} style={{ position: 'absolute', top: 0, width: '100%', height: 240, resizeMode: 'cover' }} />
        <BackgroundOverlay />
        <Header onPressClose={this.goBack} />
        <View style={{ height: 120, justifyContent: 'flex-end' }}>
          <Text style={{ color: colors.white, fontSize: 36, padding: 20 }}>Nicole James</Text>
        </View>
        <TouchableOpacity style={[styles.moreButton, {
          position: 'absolute',
          top: HEADER_STATUSBAR_HEIGHT + 120 - PLUS_BUTTON_HALF_HEIGHT,
          right: 20,
          zIndex: 1,
        }]} onPress={noop}>
          <Ionicons name='ios-more-outline' style={styles.moreButtonIcon} />
        </TouchableOpacity>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <MonthSelector month='FEBRUARY' year='2015' />
        </View>
      </View>
    )
  }
}

export default ProfileScreen
