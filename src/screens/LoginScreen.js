import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Constants, ScreenOrientation, Svg } from 'expo'
import { withProps } from 'recompose'

const noop = () => {}

const styles = StyleSheet.create({
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

})

const LogoSvg = () =>
  <View style={styles.LogoContainer}>
    <Svg height={160} width={160}>
      <Svg.Circle cx={80} cy={80} r={80} fill='#fff' />
      <Svg.Rect x={50} y={100} width={50} height={20} fill='#e25' rotate={-135} origin='60, 110' />
      <Svg.Rect x={50} y={100} width={100} height={20} fill='#ff3366' rotate={-45} origin='60, 110' />
    </Svg>
  </View>

const LoginField = ({ iconName = 'user-o', placeholder = 'Username' }) =>
  <View style={{
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 60,
    borderBottomColor: '#fff8',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  }}>
    <FontAwesome name={iconName} style={{
      fontSize: 20,
      color: '#fff',
      paddingLeft: 25,
      paddingRight: 15,
    }} />
    <TextInput placeholder={placeholder} style={{ flex: 1 }} underlineColorAndroid='transparent' />
  </View>

const UsernameField = withProps({ iconName: 'user-o', placeholder: 'Username' })(LoginField)
const PasswordField = withProps({ iconName: 'lock', placeholder: 'Password' })(LoginField)

const ForgotPassword = ({ onPress = noop }) =>
  <View style={{ height: 60, alignItems: 'flex-end', padding: 10 }}>
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: '#fff' }}>Forgot Password</Text>
    </TouchableOpacity>
  </View>

const SignInButton = ({ onPress = noop }) =>
  <TouchableOpacity onPress={onPress} style={{ height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff3366' }}>
    <Text style={{ color: '#fff' }} >Sign In</Text>
  </TouchableOpacity>

const SignUp = ({ onPress = noop }) =>
  <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#777' }}>Don't have an account? </Text>
    <TouchableOpacity onPress={onPress}><Text style={{ color: '#fff' }}>Sign Up</Text></TouchableOpacity>
  </View>

const StatusBarSpacer = () =>
  <View style={{ height: Constants.statusBarHeight }} />

const BackgroundOverlay = ({ backgroundColor = '#000', opacity = 0.5 }) =>
  <View style={[StyleSheet.absoluteFill, { backgroundColor, opacity }]} />

class LoginScreen extends React.Component {
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
          <LogoSvg />
          <KeyboardAvoidingView behavior='padding'>
            <UsernameField />
            <PasswordField />
            <ForgotPassword />
            <SignInButton />
          </KeyboardAvoidingView>
          <SignUp />
        </ScrollView>
      </ImageBackground>
    )
  }
}

export { LoginScreen }
