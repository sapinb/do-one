import React from 'react'
import { View, StyleSheet } from 'react-native'

export const BackgroundOverlay = ({ backgroundColor = '#000', opacity = 0.5 }) =>
  <View style={[StyleSheet.absoluteFill, { backgroundColor, opacity }]} />
