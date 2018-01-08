import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native'

import { Calendar } from 'react-native-calendars'

import { StyledText as Text } from '../components/StyledText'
import { BackgroundOverlay } from '../components/BackgroundOverlay'
import { AnimatedOpacityHeader as Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'
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

  render () {
    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 10, 60, 110],
      outputRange: [0, 0, 0.5, 0.5],
    })
    return (
      <View style={{ flex: 1 }}>
        <Image source={backgrounds.snowyTree()} style={{ position: 'absolute', top: 0, width: '100%', height: 240, resizeMode: 'cover' }} />
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
          <View style={{ height: 120, paddingHorizontal: 20, justifyContent: 'space-between', paddingBottom: 15 }}>
            <Text style={{ color: colors.white, fontSize: 32 }}>February <Text style={{ color: colors.white50 }}>2015</Text></Text>
            <View style={{ flexDirection: 'row' }}>
              <DateRangeItem title='DAY' />
              <DateRangeItem title='WEEK' />
              <DateRangeItem title='MONTH' active />
            </View>
          </View>
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
        </Animated.ScrollView>
        <FabPlus onPress={this.toCreateScreen} />
      </View>
    )
  }
}

export default CalendarScreen
