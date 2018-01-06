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
import { noop } from '../utils/index'

const styles = StyleSheet.create({
  commentText: {
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },

  graphButtonBg: {
    width: '100%',
    height: 28,
    marginTop: 28,
    backgroundColor: colors.white,
  },
  graphButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.radicalRed,
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  graphButtonIcon: {
    color: colors.white,
    fontSize: 32,
  },

  monthBarUpperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthBarChevron: {
    fontSize: 20,
    color: colors.white50,
    paddingHorizontal: 20,
  },
  monthBarUpperText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 32,
    color: colors.white,
  },
  monthBarLowerText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.white50,
  },

  taskStatItem: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    borderBottomColor: '#0004',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  taskStatItemIndicator: {
    width: 10,
    height: 10,
    margin: 15,
  },
  taskStatItemTitle: {
    flex: 1,
  },
  taskStatItemCount: {
    margin: 15
  }
})

const MonthBar = () =>
  <View>
    <View style={styles.monthBarUpperContainer}>
      <TouchableOpacity>
        <Ionicons name='ios-arrow-back' style={styles.monthBarChevron} />
      </TouchableOpacity>
      <Text style={styles.monthBarUpperText}>February</Text>
      <TouchableOpacity>
        <Ionicons name='ios-arrow-forward' style={styles.monthBarChevron} />
      </TouchableOpacity>
    </View>
    <Text style={styles.monthBarLowerText}>2015</Text>
  </View>

const CircularGraphs = () => <View style={{ flex: 1 }} />

const TaskStatItem = ({ color, title, count }) =>
  <View style={styles.taskStatItem}>
    <View style={[styles.taskStatItemIndicator, { backgroundColor: color }]} />
    <Text style={styles.taskStatItemTitle}>{title}</Text>
    <Text style={styles.taskStatItemCount}>{count}</Text>
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
        <Text style={styles.commentText}>
          Good job, you've completed 6%{'\n'}more tasks this month.
        </Text>
        <View>
          <View style={styles.graphButtonBg} />
          <TouchableOpacity style={styles.graphButton} onPress={noop}>
            <Ionicons name='ios-stats-outline' style={styles.graphButtonIcon} />
          </TouchableOpacity>
        </View>
        <TaskStatItem color={colors.viking} title='Completed' count='108' />
        <TaskStatItem color={colors.texasRose} title='Snoozed' count='56' />
        <TaskStatItem color={colors.heliotrope} title='Overdue' count='36' />
      </ImageBackground>
    )
  }
}

export default OverviewScreen
