import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { resetTo } from '../navigators/navigationActions'
import { StyledText as Text } from '../components/StyledText'
import { StatusBarSpacer } from '../components/StatusBarSpacer'
import { UsernameField, PasswordField, NameField, EmailField } from '../components/LoginTextField'
import { LoginButton as SignUpButton } from '../components/LoginButton'
import { BackgroundOverlay } from '../components/BackgroundOverlay'
import { noop } from '../utils'
import colors from '../constants/colors'
import backgrounds from '../images/backgrounds'

const styles = StyleSheet.create({
  SignInContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignInText: {
    color: colors.white50,
    backgroundColor: 'transparent',
  },
  SignInTextTouchable: {
    color: colors.white,
    backgroundColor: 'transparent',
  },
  BackButtonContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BackButtonIcon: {
    fontSize: 60,
    color: colors.white,
    backgroundColor: 'transparent',
  },
  SignUpText: {
    fontSize: 40,
    color: colors.white,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  }
})

const BackButton = ({ onPress = noop }) =>
  <TouchableOpacity style={styles.BackButtonContainer} onPress={onPress}>
    <Ionicons name='ios-arrow-round-back-outline' style={styles.BackButtonIcon} />
  </TouchableOpacity>

const SignUpText = () =>
  <Text style={styles.SignUpText}>Sign Up</Text>

const SignIn = ({ onPress = noop }) =>
  <View style={styles.SignInContainer}>
    <Text style={styles.SignInText}>Already have an account? </Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.SignInTextTouchable}>Sign In</Text>
    </TouchableOpacity>
  </View>

class SignUpScreen extends React.Component {
  goBack = () => this.props.navigation.goBack()

  toWalkthroughScreen = () => this.props.navigation.dispatch(resetTo({ routeName: 'WalkthroughScreen' }))

  render () {
    return (
      <ImageBackground
        source={backgrounds.cliff()}
        style={{ flex: 1 }}
      >
        <BackgroundOverlay backgroundColor='#000' opacity={0.25} />
        <StatusBarSpacer />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} >
          <BackButton onPress={this.goBack} />
          <SignUpText />
          <View style={{ height: 20 }} />
          <KeyboardAvoidingView behavior='padding'>
            <NameField />
            <UsernameField />
            <EmailField />
            <PasswordField />
          </KeyboardAvoidingView>
          <View style={{ flex: 1 }} />
          <SignUpButton title='Sign Up' onPress={this.toWalkthroughScreen} />
          <SignIn onPress={this.goBack} />
        </ScrollView>
      </ImageBackground>
    )
  }
}

export default SignUpScreen
