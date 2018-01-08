import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { withProps } from 'recompose'

import colors from '../constants/colors'

const styles = StyleSheet.create({
  textFieldContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 60,
    borderBottomColor: colors.white50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: colors.white,
    paddingLeft: 25,
    paddingRight: 15,
    backgroundColor: 'transparent',
  },
  textInput: {
    flex: 1,
    color: colors.white,
    fontFamily: 'muli-regular'
  },
})

const LoginTextField = ({ iconName = 'user-o', style, ...props }) =>
  <View style={styles.textFieldContainer}>
    <FontAwesome name={iconName} style={styles.icon} />
    <TextInput
      {...props}
      style={[style, styles.textInput]}
      underlineColorAndroid='transparent'
      placeholderTextColor={colors.white}
    />
  </View>

const UsernameField = withProps({ iconName: 'user-o', placeholder: 'Username' })(LoginTextField)
const PasswordField = withProps({ iconName: 'lock', placeholder: 'Password', secureTextEntry: true })(LoginTextField)
const NameField = withProps({ iconName: 'user', placeholder: 'Name' })(LoginTextField)
const EmailField = withProps({ iconName: 'envelope-o', placeholder: 'Email' })(LoginTextField)

export {
  LoginTextField,
  UsernameField,
  PasswordField,
  NameField,
  EmailField,
}
