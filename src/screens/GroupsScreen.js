import React from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from 'react-native'

import { BackgroundOverlay } from '../components/BackgroundOverlay'
import { AnimatedOpacityHeader as Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'

import { noop } from '../utils'

import backgrounds from '../images/backgrounds'
import colors from '../constants/colors'

const GroupItem = ({ title, count = 0, color = 'black', onPress = noop }) =>
  <TouchableHighlight
    onPress={onPress}
    underlayColor={colors.gray25}
    style={{
      width: '50%',
    }}
  >
    <View style={{
      height: 150,
      borderBottomColor: colors.gray25,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderRightColor: colors.gray25,
      borderRightWidth: StyleSheet.hairlineWidth,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{ fontSize: 24 }}>{title}</Text>
      <Text style={{ color: colors.gray50, marginVertical: 10 }}>{count} ITEMS</Text>
      <View style={{ width: 20, height: 3, backgroundColor: color }} />
    </View>
  </TouchableHighlight>

class GroupsScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  render () {
    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 10, 60, 110],
      outputRange: [0, 0, 0.5, 0.5],
    })
    return (
      <View style={{ flex: 1 }}>
        <Image source={backgrounds.cloth()} style={{ position: 'absolute', top: 0, width: '100%', height: 240, resizeMode: 'cover' }} />
        <BackgroundOverlay />
        <Header
          style={{ position: 'absolute', top: 0, zIndex: 1 }}
          backgroundOpacity={backgroundOpacity}
          onPressMenu={this.openMenu}
        />
        <Animated.ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: HEADER_STATUSBAR_HEIGHT }}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this._animatedValue
                }
              }
            }
          ], { useNativeDriver: true })}
        >
          <View style={{ height: 120, paddingTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ color: colors.white, fontSize: 32 }}>My Groups</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap', backgroundColor: colors.white }}>
            <GroupItem title='Shop' count={25} color={colors.viking} />
            <GroupItem title='Work' count={12} color={colors.heliotrope} />
            <GroupItem title='Health' count={3} color={colors.heliotrope} />
            <GroupItem title='Travel' count={8} color={colors.texasRose} />
            <GroupItem title='Bills' count={16} color={colors.radicalRed50} />
            <GroupItem title='Auto' count={14} color={colors.radicalRed} />
          </View>
        </Animated.ScrollView>
      </View>
    )
  }
}

export default GroupsScreen
