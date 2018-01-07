import React from 'react'
import { Text } from 'react-native'

export const StyledText = ({ style, bold, light, ...props }) =>
  <Text {...props} style={[{ fontFamily: bold ? 'muli-bold' : light ? 'muli-light' : 'muli-regular' }, style]} />

StyledText.propTypes = Text.propTypes
StyledText.defaultProps = Text.defaultProps
