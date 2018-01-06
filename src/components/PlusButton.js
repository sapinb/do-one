import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { noop } from '../utils'
import colors from '../constants/colors'

export const PlusButton = ({ onPress = noop, style }) =>
  <TouchableOpacity
    onPress={onPress}
    style={[{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.radicalRed,
      alignItems: 'center',
      justifyContent: 'center',
    }, style]}
  >
    <Ionicons name='ios-add' style={{ color: colors.white, fontSize: 64 }} />
  </TouchableOpacity>

export const PLUS_BUTTON_HEIGHT = 60
export const PLUS_BUTTON_HALF_HEIGHT = PLUS_BUTTON_HEIGHT / 2
