import React from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import { StyledText as Text } from '../components/StyledText'
import { BackgroundImage } from '../components/BackgroundImage'
import { AnimatedOpacityHeader as Header } from '../components/Header'

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
      <Text light style={{ color: colors.gray50, marginVertical: 10 }}>{count} ITEMS</Text>
      <View style={{ width: 20, height: 3, backgroundColor: color }} />
    </View>
  </TouchableHighlight>

const groups = [
  { title: 'Shop', count: 25, color: colors.viking },
  { title: 'Work', count: 12, color: colors.heliotrope },
  { title: 'Health', count: 3, color: colors.heliotrope },
  { title: 'Travel', count: 8, color: colors.texasRose },
  { title: 'Bills', count: 16, color: colors.radicalRed50 },
  { title: 'Auto', count: 14, color: colors.radicalRed50 },
]

class GroupsScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  toListScreen = (groupName) => () => this.props.navigation.navigate('ListScreen', { groupName })

  renderForeground = () =>
    <View style={{ height: 200, paddingTop: 20, paddingHorizontal: 20, justifyContent: 'center' }}>
      <Text style={{ color: colors.white, fontSize: 32 }}>My Groups</Text>
    </View>

  renderBackground = () => <BackgroundImage source={backgrounds.cloth()} opacity={0.25} />

  render () {
    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 60, 160, 170],
      outputRange: [0, 0, 0.5, 0.5],
    })
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={{ position: 'absolute', top: 0, zIndex: 1 }}
          backgroundOpacity={backgroundOpacity}
          onPressMenu={this.openMenu}
        />
        <ParallaxScrollView
          animatedScrollY={this._animatedValue}
          parallaxHeaderHeight={200}
          renderForeground={this.renderForeground}
          renderBackground={this.renderBackground}
          fadeOutForeground={false}
        >
          <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap', backgroundColor: colors.white }}>
            {groups.map((group, idx) => <GroupItem key={idx} {...group} onPress={this.toListScreen(group.title)} />)}
          </View>
        </ParallaxScrollView>
      </View>
    )
  }
}

export default GroupsScreen
