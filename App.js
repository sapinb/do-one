import React from 'react'
import { ScreenOrientation, Font, AppLoading } from 'expo'

import { RootNavigator } from './src/navigators/RootNavigator'

export default class App extends React.Component {
  componentWillMount () {
    // lock orientation to portrait for all screens
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  state = {
    isLoaded: false
  }

  async _handleLoadAsync () {
    await Font.loadAsync({
      'muli-regular': require('./assets/fonts/Muli/Muli-Regular.ttf'),
      'muli-bold': require('./assets/fonts/Muli/Muli-Bold.ttf'),
      'muli-light': require('./assets/fonts/Muli/Muli-Light.ttf'),
    })
  }

  render () {
    if (!this.state.isLoaded) {
      return (
        <AppLoading
          startAsync={this._handleLoadAsync}
          onFinish={() => this.setState({ isLoaded: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <RootNavigator />
    )
  }
}
