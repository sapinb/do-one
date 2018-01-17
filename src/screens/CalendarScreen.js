import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import { Calendar } from 'react-native-calendars'

import { StyledText as Text } from '../components/StyledText'
import { BackgroundImage } from '../components/BackgroundImage'
import { AnimatedOpacityHeader as Header } from '../components/Header'
import { PlusButton } from '../components/PlusButton'
import { TodoItem } from '../components/TodoItem'

import { noop } from '../utils'

import profilePics from '../images/profilePics'
import backgrounds from '../images/backgrounds'
import colors from '../constants/colors'

const FabPlus = ({ onPress = noop }) =>
  <PlusButton onPress={onPress} style={{ position: 'absolute', bottom: 20, right: 20 }} />

const DateRangeItem = ({ title, active }) =>
  <TouchableOpacity style={[{ height: 25, marginRight: 25 }, active && { borderBottomColor: colors.white, borderBottomWidth: 1 }]}>
    <Text light style={{ color: colors.white, fontSize: 12 }}>{title}</Text>
  </TouchableOpacity>

class CalendarScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  toCreateScreen = () => this.props.navigation.navigate('CreateScreen')

  renderForeground = () =>
    <View style={{ height: 200, justifyContent: 'flex-end' }}>
      <View style={{ height: 120, paddingHorizontal: 20, justifyContent: 'space-between', paddingBottom: 15 }}>
        <Text style={{ color: colors.white, fontSize: 32 }}>February <Text style={{ color: colors.white50 }}>2015</Text></Text>
        <View style={{ flexDirection: 'row' }}>
          <DateRangeItem title='DAY' />
          <DateRangeItem title='WEEK' />
          <DateRangeItem title='MONTH' active />
        </View>
      </View>
    </View>

  renderBackground = () => <BackgroundImage source={backgrounds.snowyTree()} opacity={0.25} />

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
          <Calendar
            current='2015-02-08'
            markedDates={{
              '2015-02-01': { marked: true },
              '2015-02-04': { marked: true },
              '2015-02-05': { marked: true },
              '2015-02-08': { marked: true, selected: true },
              '2015-02-10': { marked: true },
              '2015-02-12': { marked: true },
              '2015-02-16': { marked: true },
              '2015-02-18': { marked: true },
              '2015-02-20': { marked: true },
              '2015-02-22': { marked: true },
              '2015-02-25': { marked: true },
              '2015-02-26': { marked: true },
              '2015-02-28': { marked: true },
            }}
            hideArrows
            style={{
              paddingVertical: 10,
              borderBottomColor: colors.gray50,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
            theme={{
              textDayFontFamily: 'muli-regular',
              textMonthFontFamily: 'muli-regular',
              textDayHeaderFontFamily: 'muli-light',
              textDayFontSize: 14,

              dotColor: colors.radicalRed,
              selectedDotColor: colors.radicalRed,

              selectedDayBackgroundColor: colors.gray12,
              selectedDayTextColor: colors.black,

              'stylesheet.calendar.header': {
                header: {
                  height: 0,
                },
              },
            }}
          />
          <TodoItem title='New Subpage for Janet' time='8 - 10am' imageSource={profilePics.friend1()} snoozed />
          <TodoItem title='Catch up with Tom' time='11 - 12pm  Hangouts' imageSource={profilePics.friend2()} completed />
          <TodoItem title='Lunch with Diane' time='1pm  Restaurant' imageSource={profilePics.friend3()} />
          <TodoItem title='Catch up with Tom' time='10:00' imageSource={profilePics.friend4()} />
          <TodoItem title='Lunch with Diane' time='10:00' imageSource={profilePics.friend5()} />
        </ParallaxScrollView>
        <FabPlus onPress={this.toCreateScreen} />
      </View>
    )
  }
}

export default CalendarScreen
