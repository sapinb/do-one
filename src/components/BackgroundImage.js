import React from 'react'
import {
  View,
  Image,
} from 'react-native'

import { BackgroundOverlay } from './BackgroundOverlay'

export const BackgroundImage = ({ source, opacity }) =>
  <View style={{ width: '100%', height: '100%' }}>
    <Image source={source} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
    <BackgroundOverlay opacity={opacity} />
  </View>
