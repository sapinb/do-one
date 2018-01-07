import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { StyledText as Text } from '../components/StyledText'
import { AnimatedOpacityHeader as Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'
import { BackgroundOverlay } from '../components/BackgroundOverlay'
import { PlusButton } from '../components/PlusButton'
import { TodoItem } from '../components/TodoItem'

import { noop } from '../utils'
import colors from '../constants/colors'
import backgrounds from '../images/backgrounds'
import profilePics from '../images/profilePics'

const CalendarMonth = () =>
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
    <TouchableOpacity>
      <Ionicons name='ios-arrow-back' style={{ fontSize: 30, color: colors.white, paddingHorizontal: 20 }} />
    </TouchableOpacity>
    <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, color: colors.white }}>FEBRUARY</Text>
    <TouchableOpacity>
      <Ionicons name='ios-arrow-forward' style={{ fontSize: 30, color: colors.white, paddingHorizontal: 20 }} />
    </TouchableOpacity>
  </View>

const CalenderDay = ({ day, date, active, hasDot }) =>
  <View style={{ flex: 1, alignItems: 'center' }}>
    <Text light style={{ color: '#0008', marginBottom: 5 }}>{day}</Text>
    <View style={[{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }, active && { borderRadius: 18, backgroundColor: '#0002' }]}>
      <Text>{date}</Text>
      {hasDot &&
      <View style={{ position: 'absolute', bottom: 5, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.radicalRed }} />}
    </View>
  </View>

const CalendarWeek = () =>
  <View style={{
    height: 100,
    width: '100%',
    backgroundColor: colors.white,
    borderBottomColor: '#0008',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  }}>
    <CalenderDay day='SUN' date='7' />
    <CalenderDay day='MON' date='8' active hasDot />
    <CalenderDay day='TUE' date='9' />
    <CalenderDay day='WED' date='10' />
    <CalenderDay day='THU' date='11' hasDot />
    <CalenderDay day='FRI' date='12' hasDot />
    <CalenderDay day='SAT' date='13' />
  </View>

const FabPlus = ({ onPress = noop }) =>
  <PlusButton onPress={onPress} style={{ position: 'absolute', bottom: 20, right: 20 }} />

class HomeScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  toCreateScreen = () => this.props.navigation.navigate('CreateScreen')

  render () {
    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 60, 160, 210],
      outputRange: [0, 0, 0.5, 0.5],
    })
    return (
      <ImageBackground
        source={backgrounds.cliff()}
        style={{ flex: 1 }}
      >
        <BackgroundOverlay opacity={0.25} />
        <Header backgroundOpacity={backgroundOpacity} onPressMenu={this.openMenu} style={{ position: 'absolute', top: 0, zIndex: 1 }} />
        <Animated.ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this._animatedValue
                }
              }
            }
          ], { useNativeDriver: true })}
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'center', paddingTop: HEADER_STATUSBAR_HEIGHT }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={{ textAlign: 'center', fontSize: 32, color: colors.white }}>Good Morning</Text>
          </View>
          <View style={{ marginVertical: 30 }}>
            <Image source={profilePics.me()} style={{ width: 128, height: 128, borderRadius: 64 }} />
            <Text style={{ width: 30, height: 30, color: '#fff', backgroundColor: colors.viking, fontSize: 20, borderRadius: 15, position: 'absolute', top: 5, right: 5, textAlign: 'center' }}>3</Text>
          </View>
          <CalendarMonth />
          <CalendarWeek />
          <View>
            <TodoItem title='New Subpage for Janet' time='8 - 10am' imageSource={profilePics.friend1()} completed />
            <TodoItem title='Catch up with Tom' time='11 - 12pm  Hangouts' imageSource={profilePics.friend2()} />
            <TodoItem title='Lunch with Diane' time='1pm  Restaurant' imageSource={profilePics.friend3()} />
            <TodoItem title='Lunch' time='10:00' imageSource={profilePics.friend4()} />
            <TodoItem title='Lunch' time='10:00' imageSource={profilePics.friend5()} />
          </View>
        </Animated.ScrollView>
        <FabPlus onPress={this.toCreateScreen} />
      </ImageBackground>
    )
  }
}

export default HomeScreen
