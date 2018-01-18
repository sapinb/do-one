import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { Svg } from 'expo'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import { Ionicons } from '@expo/vector-icons'

import { StyledText as Text } from '../components/StyledText'
import { AnimatedOverviewHeader as Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'
import { BackgroundImage } from '../components/BackgroundImage'
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

const SvgCircleArc = ({ cx, cy, r, startAngle = 0, angle, ...props }) => {
  const a0 = startAngle * Math.PI / 180
  const a1 = angle * Math.PI / 180

  const x0 = r * Math.cos(a0) + cx
  const y0 = r * Math.sin(a0) + cy

  const x1 = r * Math.cos(a1) + cx
  const y1 = r * Math.sin(a1) + cy

  const largeArcFlag = (angle - startAngle) > 180 ? 1 : 0

  const d = `M ${x0} ${y0} A ${r} ${r} 0 ${largeArcFlag} 1 ${x1} ${y1}`
  return (
    <Svg.Path {...props} d={d} />
  )
}

const CircleProgress = ({ progress, radius, color }) => {
  // limit progress between 0, 100
  progress = progress < 0 ? 0 : progress > 100 ? 100 : progress

  const strokeWidth = 3
  const dim = radius * 2 + strokeWidth * 2
  const c = dim / 2
  let angle = progress * 360 / 100

  // ark from 0 - 360 becomes becomes empty, so limit to 359 degrees
  if (angle > 359) angle = 359

  return (
    <View>
      <Svg width={dim} height={dim}>
        <Svg.Circle
          cx={c}
          cy={c}
          r={radius}
          stroke={'#fff2'}
          strokeWidth={strokeWidth}
          fillOpacity={0}
        />
        <SvgCircleArc
          cx={c}
          cy={c}
          startAngle={-90}
          angle={angle - 90}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          fillOpacity={0}
        />
      </Svg>
      <View style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.white, fontSize: radius * 0.6 }}>{progress}</Text>
          <Text light style={{ color: colors.white, fontSize: radius * 0.3, paddingBottom: radius * 0.2, paddingLeft: 2 }}>%</Text>
        </View>
      </View>
    </View>
  )
}

const CircularGraphs = ({ angle }) =>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' }}>
      <CircleProgress progress={28} radius={35} color={colors.texasRose} />
      <CircleProgress progress={54} radius={60} color={colors.viking} />
      <CircleProgress progress={18} radius={35} color={colors.heliotrope} />
    </View>
  </View>

const TaskStatItem = ({ color, title, count }) =>
  <View style={styles.taskStatItem}>
    <View style={[styles.taskStatItemIndicator, { backgroundColor: color }]} />
    <Text style={styles.taskStatItemTitle}>{title}</Text>
    <Text style={styles.taskStatItemCount}>{count}</Text>
  </View>

class OverviewScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  openMenu = () => this.props.navigation.navigate('DrawerOpen')

  renderForeground = () =>
    <View style={{ height: 400, paddingTop: HEADER_STATUSBAR_HEIGHT, justifyContent: 'flex-end' }}>
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
          profileImageSource={profilePics.me()}
          hasDot
        />
        <ParallaxScrollView
          animatedScrollY={this._animatedValue}
          parallaxHeaderHeight={400}
          renderForeground={this.renderForeground}
          renderBackground={this.renderBackground}
          fadeOutForeground={false}
        >
          <TaskStatItem color={colors.viking} title='Completed' count='108' />
          <TaskStatItem color={colors.texasRose} title='Snoozed' count='56' />
          <TaskStatItem color={colors.heliotrope} title='Overdue' count='36' />
        </ParallaxScrollView>
      </View>
    )
  }
}

export default OverviewScreen
