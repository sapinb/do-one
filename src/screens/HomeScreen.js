import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { AnimatedOpacityHeader as Header } from '../components/Header'
import { BackgroundOverlay } from '../components/BackgroundOverlay'
import { noop } from '../utils'
import colors from '../constants/colors'

const TodoItem = ({ imageSource, title, time, active = false }) =>
  <View style={{ height: 80, width: '100%', flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#0008', backgroundColor: colors.white }}>
    <View style={{ height: '100%', width: 5, backgroundColor: active ? colors.viking : '#0008' }} />
    <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={imageSource} style={{ width: 60, height: 60, borderRadius: 30 }} />
    </View>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text style={{ color: '#0008' }}>{time}</Text>
    </View>
  </View>

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
    <Text style={{ color: '#0008', marginBottom: 5 }}>{day}</Text>
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
  <TouchableOpacity onPress={onPress} style={{ position: 'absolute', bottom: 20, right: 20 }}>
    <Ionicons name='ios-add-circle' style={{ color: colors.radicalRed, fontSize: 64 }} />
  </TouchableOpacity>

class HomeScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  render () {
    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 60, 160, 210],
      outputRange: [0, 0, 0.5, 0.5],
    })
    return (
      <ImageBackground
        source={require('../images/login-bg.jpg')}
        style={{ flex: 1 }}
      >
        <BackgroundOverlay opacity={0.25} />
        <Animated.ScrollView
          stickyHeaderIndices={[0]}
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
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <Header backgroundOpacity={backgroundOpacity} onPressMenu={this.openMenu} />
          <View>
            <Text style={{ textAlign: 'center', fontSize: 32, color: colors.white }}>Good Morning</Text>
          </View>
          <View style={{ marginVertical: 30 }}>
            <Image source={require('../images/profile/me.jpg')} style={{ width: 128, height: 128, borderRadius: 64 }} />
            <Text style={{ width: 30, height: 30, color: '#fff', backgroundColor: colors.viking, fontSize: 20, borderRadius: 15, position: 'absolute', top: 5, right: 5, textAlign: 'center' }}>3</Text>
          </View>
          <CalendarMonth />
          <CalendarWeek />
          <View>
            <TodoItem title='New Subpage for Janet' time='8 - 10am' imageSource={require('../images/profile/1.jpg')} active />
            <TodoItem title='Catch up with Tom' time='11 - 12pm  Hangouts' imageSource={require('../images/profile/2.jpg')} />
            <TodoItem title='Lunch with Diane' time='1pm  Restaurant' imageSource={require('../images/profile/3.jpg')} />
            <TodoItem title='Lunch' time='10:00' imageSource={require('../images/profile/4.jpg')} />
            <TodoItem title='Lunch' time='10:00' imageSource={require('../images/profile/5.jpg')} />
          </View>
        </Animated.ScrollView>
        <FabPlus onPress={() => {}} />
      </ImageBackground>
    )
  }
}

export default HomeScreen
