import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { noop } from '../utils'

export const LoginButton = ({ onPress = noop, title = 'Sign In' }) =>
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff3366'
    }}>
    <Text style={{ color: '#fff' }}>{title}</Text>
  </TouchableOpacity>
