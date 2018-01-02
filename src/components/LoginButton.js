import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { noop } from '../utils'
import colors from '../constants/colors'

export const LoginButton = ({ onPress = noop, title = 'Sign In' }) =>
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.radicalRed
    }}>
    <Text style={{ color: '#fff' }}>{title}</Text>
  </TouchableOpacity>
