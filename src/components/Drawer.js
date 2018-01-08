import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { DrawerItems, SafeAreaView } from 'react-navigation'

import { StatusBarSpacer } from './StatusBarSpacer'

export class Drawer extends React.Component {
  closeMenu = () => this.props.navigation.navigate('DrawerClose')

  render () {
    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <StatusBarSpacer />
          <TouchableOpacity onPress={this.closeMenu} style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='ios-close' style={{ fontSize: 40 }} />
          </TouchableOpacity>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    )
  }
}