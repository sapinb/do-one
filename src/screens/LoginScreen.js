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
import { Svg } from 'expo'

import { resetTo } from '../navigators/navigationActions'

import { StatusBarSpacer } from '../components/StatusBarSpacer'
import { UsernameField, PasswordField } from '../components/LoginTextField'
import { LoginButton as SignInButton } from '../components/LoginButton'
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

const LogoSvg = () =>
  <View style={styles.LogoContainer}>
    <Svg height={160} width={160}>
      <Svg.Circle cx={80} cy={80} r={80} fill='#fff' />
      <Svg.Rect x={50} y={100} width={50} height={20} fill={colors.radicalRed} rotate={-135} origin='60, 110' />
      <Svg.Rect x={50} y={100} width={50} height={20} fill='#0002' rotate={-135} origin='60, 110' />
      <Svg.Rect x={50} y={100} width={100} height={20} fill={colors.radicalRed} rotate={-45} origin='60, 110' />
    </Svg>
  </View>

const ForgotPassword = ({ onPress = noop }) =>
  <View style={styles.ForgotPasswordContainer}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.ForgotPasswordText}>Forgot Password</Text>
    </TouchableOpacity>
  </View>

const SignUp = ({ onPress = noop }) =>
  <View style={styles.SignUpContainer}>
    <Text style={styles.SignUpText}>Don't have an account? </Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.SignUpTextTouchable}>Sign Up</Text>
    </TouchableOpacity>
  </View>

class LoginScreen extends React.Component {
  toSignUpScreen = () => this.props.navigation.navigate('SignUpScreen')

  toHomeScreen = () => this.props.navigation.dispatch(resetTo({ routeName: 'MainDrawer' }))

  render () {
    return (
      <ImageBackground
        source={require('../images/login-bg.jpg')}
        style={{ flex: 1 }}
      >
        <BackgroundOverlay backgroundColor='#000' opacity={0.25} />
        <StatusBarSpacer />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} >
          <LogoSvg />
          <KeyboardAvoidingView behavior='padding'>
            <UsernameField />
            <PasswordField />
            <ForgotPassword />
            <SignInButton title='Sign In' onPress={this.toHomeScreen} />
          </KeyboardAvoidingView>
          <SignUp onPress={this.toSignUpScreen} />
        </ScrollView>
      </ImageBackground>
    )
  }
}

export default LoginScreen
