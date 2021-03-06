import React from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { get } from 'lodash'

import { StyledText as Text } from '../components/StyledText'
import { AnimatedListHeader as Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'
import { BackgroundImage } from '../components/BackgroundImage'
import { PlusButton, PLUS_BUTTON_HALF_HEIGHT } from '../components/PlusButton'

import { noop } from '../utils'

import backgrounds from '../images/backgrounds'
import colors from '../constants/colors'

const ListItem = ({ title, done, onPress = noop }) =>
  <TouchableHighlight onPress={onPress} underlayColor={colors.gray25}>
    <View style={{
      flexDirection: 'row',
      height: 60,
      borderBottomColor: colors.gray25,
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignItems: 'center',
    }}>
      <View style={{ height: '100%', width: 5, backgroundColor: done ? colors.viking : 'transparent' }} />
      <Ionicons name='ios-checkmark-outline' style={{ fontSize: 60, color: done ? colors.viking : colors.gray50, width: 60, height: 60, textAlign: 'center' }} />
      <Text>{title}</Text>
    </View>
  </TouchableHighlight>

class ListScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  state = {
    items: [
      {title: 'Apple', done: false},
      {title: 'Bananas', done: true},
      {title: 'Juice', done: false},
      {title: 'Bread', done: true},
      {title: 'Cheese', done: false},
      {title: 'Milk', done: false},
      {title: 'Yogurt', done: false},
      {title: 'Apple', done: false},
      {title: 'Bananas', done: true},
      {title: 'Juice', done: false},
      {title: 'Bread', done: true},
      {title: 'Cheese', done: false},
      {title: 'Milk', done: false},
      {title: 'Yogurt', done: false},
    ]
  }

  toggleDone = idx => () => {
    const { items } = this.state

    this.setState({
      items: items.map((item, index) => {
        if (index === idx) {
          return {...item, done: !item.done}
        }
        return item
      })
    })
  }

  goBack = () => this.props.navigation.goBack()

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
      <BackgroundImage source={backgrounds.sandwich()} opacity={0.25} />
    </Animated.View>

  render () {
    const { items } = this.state
    const groupName = get(this.props, 'navigation.state.params.groupName', 'Shop')

    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 60, 160, 170],
      outputRange: [0, 0, 0.5, 0.5],
    })
    return (
      <View style={{ flex: 1 }}>
        {this.renderAnimatedBackground()}
        <Header
          style={{ position: 'absolute', top: 0, zIndex: 1 }}
          backgroundOpacity={backgroundOpacity}
          onPressBack={this.goBack}
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
          <View style={{ height: 120, paddingTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ color: colors.white, fontSize: 32, backgroundColor: 'transparent' }}>{groupName}</Text>
          </View>
          <PlusButton style={{
            position: 'absolute',
            top: HEADER_STATUSBAR_HEIGHT + 120 - PLUS_BUTTON_HALF_HEIGHT,
            right: 20,
            zIndex: 1
          }} />
          <View style={{ backgroundColor: colors.white }}>
            {items.map((item, idx) => <ListItem key={idx} {...item} onPress={this.toggleDone(idx)} />)}
          </View>
        </Animated.ScrollView>
      </View>
    )
  }
}

export default ListScreen
