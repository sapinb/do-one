import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TouchableItem from 'react-navigation/lib-rn/views/TouchableItem'
import { DrawerItems, SafeAreaView } from 'react-navigation'

import { resetTo } from '../navigators/navigationActions'
import { showLogoutAlert } from '../utils'

import { StyledText as Text } from './StyledText'
import { StatusBarSpacer } from './StatusBarSpacer'
import colors from '../constants/colors'

export class Drawer extends React.Component {
  closeMenu = () => this.props.navigation.navigate('DrawerClose')

  logOut = () => {
    this.props.navigation.navigate('DrawerClose')

    showLogoutAlert(() => this.props.navigation.dispatch(resetTo({ routeName: 'LoginScreen' })))
  }

  render () {
    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <StatusBarSpacer />
          <TouchableOpacity onPress={this.closeMenu} style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='ios-close' style={{ fontSize: 40 }} />
          </TouchableOpacity>
          <DrawerItems {...this.props} />
          <TouchableItem onPress={this.logOut}>
            <DrawerLabel title='Log Out' />
          </TouchableItem>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const DrawerLabel = ({ focused, tintColor, title, first = false }) =>
  <View style={[{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderBottomColor: colors.gray25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
  }, first && {
    borderTopColor: colors.gray25,
    borderTopWidth: StyleSheet.hairlineWidth,
  }]}>
    <Text style={{ color: tintColor }}>{title}</Text>
  </View>

export const getDrawerLabel = (title, first) => ({ focused, tintColor }) => {
  const props = { title, first, focused, tintColor }
  return <DrawerLabel {...props} />
}
