import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { OverviewHeader as Header } from '../components/Header'
import { BackgroundOverlay } from '../components/BackgroundOverlay'
import colors from '../constants/colors'
import backgrounds from '../images/backgrounds'
import profilePics from '../images/profilePics'

const MonthBar = () =>
  <View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity>
        <Ionicons name='ios-arrow-back' style={{ fontSize: 20, color: colors.white50, paddingHorizontal: 20 }} />
      </TouchableOpacity>
      <Text style={{ flex: 1, textAlign: 'center', fontSize: 32, color: colors.white }}>February</Text>
      <TouchableOpacity>
        <Ionicons name='ios-arrow-forward' style={{ fontSize: 16, color: colors.white50, paddingHorizontal: 20 }} />
      </TouchableOpacity>
    </View>
    <Text style={{ textAlign: 'center', fontSize: 12, color: colors.white50 }}>2015</Text>
  </View>

const CircularGraphs = () => <View style={{ flex: 1 }} />

const TaskStatItem = ({ color, title, count }) =>
  <View style={{ flexDirection: 'row', height: 60, width: '100%', backgroundColor: colors.white, alignItems: 'center', borderBottomColor: '#0004', borderBottomWidth: StyleSheet.hairlineWidth }}>
    <View style={{ width: 10, height: 10, backgroundColor: color, margin: 15 }} />
    <Text style={{ flex: 1 }}>{title}</Text>
    <Text style={{ margin: 15 }}>{count}</Text>
  </View>

class OverviewScreen extends React.Component {
  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  render () {
    return (
      <ImageBackground
        source={backgrounds.snowyTree()}
        style={{ flex: 1 }}
      >
        <BackgroundOverlay />
        <Header profileImageSource={profilePics.me()} hasDot onPressMenu={this.openMenu} />
        <MonthBar />
        <CircularGraphs />
        <Text style={{ color: colors.white, textAlign: 'center', marginBottom: 10 }}>
          Good job, you've completed 6%{'\n'}more tasks this month.
        </Text>
        <View>
          <View style={{ width: '100%', height: 25, marginTop: 25, backgroundColor: colors.white }} />
          <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: colors.radicalRed, alignSelf: 'center', position: 'absolute', top: 0 }} />
        </View>
        <TaskStatItem color={colors.viking} title='Completed' count='108' />
        <TaskStatItem color={colors.texasRose} title='Snoozed' count='56' />
        <TaskStatItem color={colors.heliotrope} title='Overdue' count='36' />
      </ImageBackground>
    )
  }
}

export default OverviewScreen
