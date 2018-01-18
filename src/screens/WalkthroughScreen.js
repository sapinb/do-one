import React from 'react'
import {
  View,
  Dimensions,
  StatusBar,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Swiper from 'react-native-swiper'

import { resetTo } from '../navigators/navigationActions'

import { StyledText as Text } from '../components/StyledText'
import { StatusBarSpacer } from '../components/StatusBarSpacer'
import { LoginButton as NextButton } from '../components/LoginButton'
import colors from '../constants/colors'

const { width } = Dimensions.get('window')

const Slide1 = () =>
  <View style={{ height: '100%', width, backgroundColor: colors.white, alignItems: 'center' }}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Ionicons name='ios-calendar-outline' style={{ color: colors.radicalRed, fontSize: 100 }} />
    </View>
    <Text style={{ textAlign: 'center', paddingBottom: 40 }}>Keep your work organized and {'\n'} quickly check your reminders with {'\n'} simple calendar.</Text>
  </View>

class WalkthroughScreen extends React.Component {
  _swiper = null

  state = {
    swiperIndex: 0
  }

  goBack = () => this.props.navigation.goBack()

  getSwiperRef = ref => { this._swiper = ref }

  onSwiperIndexChanged = index => this.setState({ swiperIndex: index })

  onNext = () => {
    const { swiperIndex } = this.state

    if (swiperIndex < 2) {
      this._swiper.scrollBy(1)
    } else {
      // go to next page
      this.props.navigation.dispatch(resetTo({ routeName: 'MainDrawer' }))
    }
  }

  render () {
    const { swiperIndex } = this.state
    const isFinalSlide = swiperIndex === 2

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='dark-content' />
        <StatusBarSpacer style={{ backgroundColor: colors.white }} />
        <Swiper
          loop={false}
          paginationStyle={{ top: 20, bottom: null }}
          activeDotColor={colors.radicalRed}
          ref={this.getSwiperRef}
          onIndexChanged={this.onSwiperIndexChanged}
        >
          <Slide1 />
          <Slide1 />
          <Slide1 />
        </Swiper>
        <NextButton
          title={isFinalSlide ? 'Start' : 'Next'}
          textStyle={isFinalSlide && { fontSize: 20 }}
          onPress={this.onNext}
        />
      </View>
    )
  }
}

export default WalkthroughScreen
