import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { noop } from '../utils'
import colors from '../constants/colors'

export const PlusButton = ({ onPress = noop, style }) =>
  <TouchableOpacity
    onPress={onPress}
    style={[{
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.radicalRed,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
    }, style]}
  >
    <Ionicons name='ios-add' style={{ color: colors.white, fontSize: 48 }} />
  </TouchableOpacity>

export const PLUS_BUTTON_HEIGHT = 56
export const PLUS_BUTTON_HALF_HEIGHT = PLUS_BUTTON_HEIGHT / 2
