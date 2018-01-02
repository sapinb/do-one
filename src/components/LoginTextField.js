import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { withProps } from 'recompose'

const styles = StyleSheet.create({
  textFieldContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 60,
    borderBottomColor: '#fff8',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#fff',
    paddingLeft: 25,
    paddingRight: 15,
  },
  textInput: {
    flex: 1,
    color: '#fff',
  },
})

const LoginTextField = ({ iconName = 'user-o', style, ...props }) =>
  <View style={styles.textFieldContainer}>
    <FontAwesome name={iconName} style={styles.icon} />
    <TextInput
      {...props}
      style={[style, styles.textInput]}
      underlineColorAndroid='transparent'
    />
  </View>

const UsernameField = withProps({ iconName: 'user-o', placeholder: 'Username' })(LoginTextField)
const PasswordField = withProps({ iconName: 'lock', placeholder: 'Password', secureTextEntry: true })(LoginTextField)

export {
  LoginTextField,
  UsernameField,
  PasswordField,
}
