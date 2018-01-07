import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { StyledText as Text } from '../components/StyledText'
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

  monthSelector: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  monthSelectorMonthText: {
    color: colors.black,
  },
  monthSelectorYearText: {
    color: colors.gray50,
    paddingLeft: 5,
  },
  monthSelectorDownContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthSelectorDownIcon: {
    fontSize: 20,
    color: colors.gray25
  },

  taskGraphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 10,
  },

  taskStatsContainer: {
    height: 120,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const MonthSelector = ({ month, year, onPressDown = noop }) =>
  <View style={styles.monthSelector}>
    <Text style={styles.monthSelectorMonthText}>{month}</Text>
    <Text light style={styles.monthSelectorYearText}>{year}</Text>
    <TouchableOpacity onPress={onPressDown} style={styles.monthSelectorDownContainer}>
      <Ionicons name='ios-arrow-down' style={styles.monthSelectorDownIcon} />
    </TouchableOpacity>
  </View>

const TaskGraphItem = ({ completed = 0, snoozed = 0, overdue = 0, max = 0, day }) => {
  if (completed + snoozed + overdue > max) {
    max = completed + snoozed + overdue
  }
  const empty = max - (completed + snoozed + overdue)

  return (
    <View style={{ alignItems: 'center', width: 30 }}>
      <View style={{ height: 150, width: 8 }}>
        <View style={{ backgroundColor: 'transparent', flex: empty }} />
        <View style={{ backgroundColor: colors.heliotrope, flex: overdue }} />
        <View style={{ backgroundColor: colors.texasRose, flex: snoozed }} />
        <View style={{ backgroundColor: colors.viking, flex: completed }} />
      </View>
      <Text light style={{ color: colors.gray50, paddingTop: 5 }}>{day}</Text>
    </View>
  )
}

const TaskGraph = ({ data = [] }) => {
  const max = data.reduce((max, { completed, snoozed, overdue }) => {
    const sum = completed + snoozed + overdue
    return sum > max ? sum : max
  }, 0)

  return (
    <View style={styles.taskGraphContainer}>
      {data.map((item, idx) => <TaskGraphItem key={idx} {...item} max={max} />)}
    </View>
  )
}

const TaskStatItem = ({ title, value, color }) =>
  <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 40, color: colors.black }}>{value}</Text>
    <Text light style={{ color: colors.gray50 }}>{title}</Text>
    <View style={{ backgroundColor: color, width: 16, height: 3, marginVertical: 10 }} />
  </View>

const TaskStats = ({ completed, snoozed, overdue }) =>
  <View style={styles.taskStatsContainer}>
    <TaskStatItem title='COMPLETED' value={completed} color={colors.viking} />
    <TaskStatItem title='SNOOZED' value={snoozed} color={colors.texasRose} />
    <TaskStatItem title='OVERDUE' value={overdue} color={colors.heliotrope} />
  </View>

const graphData = [
  {'completed': 14, 'snoozed': 7, 'overdue': 3, 'day': 1},
  {'completed': 11, 'snoozed': 7, 'overdue': 3, 'day': 3},
  {'completed': 6, 'snoozed': 3, 'overdue': 2, 'day': 6},
  {'completed': 12, 'snoozed': 6, 'overdue': 1, 'day': 9},
  {'completed': 14, 'snoozed': 3, 'overdue': 1, 'day': 12},
  {'completed': 6, 'snoozed': 5, 'overdue': 2, 'day': 15},
  {'completed': 13, 'snoozed': 3, 'overdue': 2, 'day': 18},
  {'completed': 10, 'snoozed': 5, 'overdue': 1, 'day': 21},
  {'completed': 10, 'snoozed': 3, 'overdue': 1, 'day': 24},
  {'completed': 9, 'snoozed': 7, 'overdue': 1, 'day': 27}
]

class ProfileScreen extends React.Component {
  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Image source={profilePics.myBanner()} style={{ position: 'absolute', top: 0, width: '100%', height: 240, resizeMode: 'cover' }} />
        <BackgroundOverlay />
        <Header onPressMenu={this.openMenu} />
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
          <TaskGraph data={graphData} />
          <TaskStats completed={57} snoozed={19} overdue={4} />
        </View>
      </View>
    )
  }
}

export default ProfileScreen
