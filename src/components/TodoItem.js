import React from 'react'
import {
  View,
  Image,
  StyleSheet,
} from 'react-native'

import { StyledText as Text } from './StyledText'
import colors from '../constants/colors'

export const TodoItem = ({
  imageSource,
  title,
  time,
  completed = false,
  snoozed = false,
  overdue = false,
}) =>
  <View style={{ height: 80, width: '100%', flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#0008', backgroundColor: colors.white }}>
    <View style={{ height: '100%', width: 5, backgroundColor: completed ? colors.viking : snoozed ? colors.texasRose : overdue ? colors.heliotrope : colors.gray25 }} />
    <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={imageSource} style={{ width: 60, height: 60, borderRadius: 30 }} />
    </View>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text light style={{ color: colors.gray50 }}>{time}</Text>
    </View>
  </View>
