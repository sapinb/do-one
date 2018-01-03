import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScreenOrientation } from 'expo'

import { StatusBarSpacer } from '../components/StatusBarSpacer'
import { UsernameField, PasswordField, NameField, EmailField } from '../components/LoginTextField'
import { LoginButton as SignUpButton } from '../components/LoginButton'
import { BackgroundOverlay } from '../components/BackgroundOverlay'
import { noop } from '../utils'
import colors from '../constants/colors'

const styles = StyleSheet.create({
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignUpContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignUpText: {
    color: colors.white50,
  },
  SignUpTextTouchable: {
    color: colors.white,
  },
  ForgotPasswordContainer: {
    height: 60,
    alignItems: 'flex-end',
    padding: 10,
  },
  ForgotPasswordText: {
    color: colors.white50,
  },
})

const BackButton = () =>
  <TouchableOpacity style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}>
    <Ionicons name='ios-arrow-round-back-outline' style={{ fontSize: 60, color: colors.white }} />
  </TouchableOpacity>

const SignUpText = () =>
  <Text style={{
    fontSize: 40,
    color: colors.white,
    paddingHorizontal: 20,
  }}>Sign Up</Text>

const SignIn = ({ onPress = noop }) =>
  <View style={styles.SignUpContainer}>
    <Text style={styles.SignUpText}>Already have an account? </Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.SignUpTextTouchable}>Sign In</Text>
    </TouchableOpacity>
  </View>

class SignUpScreen extends React.Component {
  componentWillMount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  componentWillUnmount () {
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN)
  }

  render () {
    return (
      <ImageBackground
        source={require('../images/login-bg.jpg')}
        style={{ flex: 1 }}
      >
        <BackgroundOverlay backgroundColor='#000' opacity={0.25} />
        <StatusBarSpacer />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} >
          <BackButton />
          <SignUpText />
          <View style={{ height: 20 }} />
          <KeyboardAvoidingView behavior='padding'>
            <NameField />
            <UsernameField />
            <EmailField />
            <PasswordField />
          </KeyboardAvoidingView>
          <View style={{ flex: 1 }} />
          <SignUpButton title='Sign Up' />
          <SignIn />
        </ScrollView>
      </ImageBackground>
    )
  }
}

export default SignUpScreen
