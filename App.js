import React from 'react'
import { ScreenOrientation } from 'expo'

import { RootNavigator } from './src/navigators/RootNavigator'

export default class App extends React.Component {
  componentWillMount () {
    // lock orientation to portrait for all screens
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  render () {
    return (
      <RootNavigator />
    )
  }
}
