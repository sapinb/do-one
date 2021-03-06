import React from 'react'
import {
  View,
  SectionList,
  Animated,
} from 'react-native'

import { StyledText as Text } from '../components/StyledText'
import { TodoItem } from '../components/TodoItem'
import { AnimatedOpacityHeader as Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'

import backgrounds from '../images/backgrounds'
import profilePics from '../images/profilePics'
import colors from '../constants/colors'
import { BackgroundImage } from '../components/BackgroundImage'

const data = [
  {
    title: 'MONDAY, FEB 8, 2015',
    data: [
      { imageSource: profilePics.friend1(), title: 'Call with Ryan', time: '2pm', completed: true },
      { imageSource: profilePics.friend2(), title: 'Lunch with Diane', time: '1pm Restaurant', completed: true },
      { imageSource: profilePics.friend3(), title: 'Catchup with Tom', time: '11-12pm Hangouts', snoozed: true },
      { imageSource: profilePics.friend4(), title: 'New subpage for Janet', time: '8-10am', completed: true },
    ]
  },
  {
    title: 'SUNDAY, FEB 7, 2015',
    data: [
      { imageSource: profilePics.friend1(), title: 'Call with Ryan', time: '2pm', completed: true },
      { imageSource: profilePics.friend2(), title: 'Lunch with Diane', time: '1pm Restaurant', completed: true },
      { imageSource: profilePics.friend3(), title: 'Catchup with Tom', time: '11-12pm Hangouts', snoozed: true },
      { imageSource: profilePics.friend4(), title: 'New subpage for Janet', time: '8-10am', completed: true },
    ]
  },
  {
    title: 'SUNDAY, FEB 6, 2015',
    data: [
      { imageSource: profilePics.friend1(), title: 'Call with Ryan', time: '2pm', completed: true },
      { imageSource: profilePics.friend2(), title: 'Lunch with Diane', time: '1pm Restaurant', completed: true },
      { imageSource: profilePics.friend3(), title: 'Catchup with Tom', time: '11-12pm Hangouts', snoozed: true },
      { imageSource: profilePics.friend4(), title: 'New subpage for Janet', time: '8-10am', overdue: true },
    ]
  },
]

const SectionHeader = ({ title }) =>
  <View style={{ height: 50, backgroundColor: colors.gray12, justifyContent: 'center', paddingHorizontal: 20 }}>
    <Text light>{title}</Text>
  </View>

const ListHeader = () =>
  <View style={{ height: HEADER_STATUSBAR_HEIGHT + 120, paddingHorizontal: 20, paddingTop: 20, justifyContent: 'center' }}>
    <Text style={{ color: colors.white, fontSize: 32 }}>Timeline</Text>
  </View>

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

class TimelineScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  renderAnimatedBackground = () =>
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
        transform: [{
          scale: this._animatedValue.interpolate({
            inputRange: [-240, 0],
            outputRange: [5, 1],
            extrapolate: 'clamp',
          })
        },
        {
          translateY: this._animatedValue.interpolate({
            inputRange: [0, 240],
            outputRange: [0, -(240 / 2)],
            extrapolateRight: 'extend',
            extrapolateLeft: 'clamp'
          })
        }]
      }}>
      <BackgroundImage source={backgrounds.cliff()} opacity={0.25} />
    </Animated.View>

  render () {
    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 10, 60, 110],
      outputRange: [0, 0, 0.5, 0.5],
    })

    return (
      <View style={{ flex: 1 }}>
        {this.renderAnimatedBackground()}
        <Header
          onPressMenu={this.openMenu}
          backgroundOpacity={backgroundOpacity}
          style={{ position: 'absolute', top: 0, zIndex: 1 }}
        />
        <AnimatedSectionList
          sections={data}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <TodoItem {...item} />}
          renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
          ListHeaderComponent={ListHeader}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this._animatedValue
                }
              }
            }
          ], { useNativeDriver: true })}
        />
      </View>
    )
  }
}

export default TimelineScreen
