import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Switch,
  ToastAndroid,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { StyledText as Text } from '../components/StyledText'
import { AnimatedCreateHeader as Header, HEADER_STATUSBAR_HEIGHT } from '../components/Header'
import { BackgroundOverlay } from '../components/BackgroundOverlay'
import { PlusButton, PLUS_BUTTON_HALF_HEIGHT } from '../components/PlusButton'

import { noop } from '../utils'

import backgrounds from '../images/backgrounds'
import profilePics from '../images/profilePics'
import colors from '../constants/colors'

const styles = StyleSheet.create({
  optionItemContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: colors.gray50,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionItemTitle: {
    flex: 1,
    color: colors.gray50,
  },
  optionItemValue: {
    color: colors.black,
  },
  timeOptionContainer: {
    borderBottomColor: colors.gray50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
  },
  timeOptionLine: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  timeOptionDate: {
    color: colors.black,
    textAlign: 'right',
  },
  timeOptionTime: {
    color: colors.black,
    textAlign: 'right',
    width: 80,
  },
})

const OptionItem = ({ title, value = null, onPress = noop }) =>
  <TouchableHighlight underlayColor={colors.gray12} onPress={onPress}>
    <View style={styles.optionItemContainer}>
      <Text style={styles.optionItemTitle}>{title}</Text>
      {value && <Text style={styles.optionItemValue}>{value}</Text>}
    </View>
  </TouchableHighlight>

const LocationOption = ({ value, onPress = noop }) =>
  <TouchableHighlight underlayColor={colors.gray12} onPress={onPress}>
    <View style={styles.optionItemContainer}>
      <Text style={styles.optionItemTitle}>Location</Text>
      <FontAwesome name='location-arrow' style={{ fontSize: 25, color: colors.gray50, paddingRight: 10 }} />
      <Text style={styles.optionItemValue}>{value}</Text>
    </View>
  </TouchableHighlight>

const PeopleOption = ({ peopleImageSources = [], onPress = noop }) =>
  <TouchableHighlight underlayColor={colors.gray12} onPress={onPress}>
    <View style={styles.optionItemContainer}>
      <Text style={styles.optionItemTitle}>People</Text>
      {peopleImageSources.map(
        (imageSource, idx) => <Image key={idx} source={imageSource} style={{ width: 32, height: 32, borderRadius: 16, marginLeft: 8 }} />
      )}
    </View>
  </TouchableHighlight>

const ShortDescOption = () =>
  <View style={[styles.optionItemContainer, { height: 60 }]}>
    <TextInput
      underlineColorAndroid='transparent'
      multiline
      numberOfLines={3}
      placeholder='Short Description'
      style={{ width: '100%', height: 48 }}
    />
  </View>

const TimeOption = ({ allDay, onAllDayValueChange = noop }) =>
  <View style={styles.timeOptionContainer}>
    <View style={styles.timeOptionLine}>
      <Text style={styles.optionItemTitle}>All day</Text>
      <Switch
        onTintColor={colors.radicalRed50}
        value={allDay}
        onValueChange={onAllDayValueChange}
        thumbTintColor={allDay ? colors.radicalRed : colors.gray12}
      />
    </View>
    <View style={styles.timeOptionLine}>
      <Text style={styles.optionItemTitle}>From</Text>
      <TouchableOpacity style={{ flexDirection: 'row' }}>
        <Text style={styles.optionItemDate}>February 9, 2015</Text>
        <Text style={styles.timeOptionTime}>9:00am</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.timeOptionLine}>
      <Text style={styles.optionItemTitle}>To</Text>
      <TouchableOpacity style={{ flexDirection: 'row' }}>
        <Text style={styles.optionItemDate}>February 9, 2015</Text>
        <Text style={styles.timeOptionTime}>10:30am</Text>
      </TouchableOpacity>
    </View>
  </View>

class CreateScreen extends React.Component {
  _animatedValue = new Animated.Value(0)

  state = {
    allDay: false,
  }

  setAllDay = allDay => this.setState({ allDay })

  goBack = () => this.props.navigation.goBack()

  handleAdd = () => {
    setTimeout(() => ToastAndroid.show('New Todo item added!', ToastAndroid.SHORT), 1000)

    this.goBack()
  }

  render () {
    const { allDay } = this.state

    const backgroundOpacity = this._animatedValue.interpolate({
      inputRange: [0, 10, 60, 110],
      outputRange: [0, 0, 0.5, 0.5],
    })
    return (
      <View style={{ flex: 1 }}>
        <Image source={backgrounds.waves()} style={{ position: 'absolute', top: 0, width: '100%', height: 240, resizeMode: 'cover' }} />
        <BackgroundOverlay />
        <Header
          style={{ position: 'absolute', top: 0, zIndex: 1 }}
          backgroundOpacity={backgroundOpacity}
          onPressClose={this.goBack}
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
            <TextInput
              style={{ color: colors.white, fontSize: 32 }}
              placeholder='Add Title'
              placeholderTextColor={colors.white}
              underlineColorAndroid='transparent'
            />
          </View>
          <PlusButton
            style={{
              position: 'absolute',
              top: HEADER_STATUSBAR_HEIGHT + 120 - PLUS_BUTTON_HALF_HEIGHT,
              right: 20,
              zIndex: 1,
            }}
            onPress={this.handleAdd}
          />
          <View style={{ backgroundColor: colors.white, paddingTop: 30 }}>
            <ShortDescOption />
            <TimeOption allDay={allDay} onAllDayValueChange={this.setAllDay} />
            <LocationOption value='Starbucks' />
            <OptionItem title='Notification' value='via Email' />
            <PeopleOption peopleImageSources={[profilePics.friend1(), profilePics.friend3(), profilePics.friend5()]} />
            <OptionItem title='Repeat' value='Monthly' />
          </View>
        </Animated.ScrollView>
      </View>
    )
  }
}

export default CreateScreen
