import React from 'react'
import { View } from 'react-native'
import { Constants } from 'expo'

export const StatusBarSpacer = ({ style }) =>
  <View style={[style, { height: Constants.statusBarHeight }]} />
