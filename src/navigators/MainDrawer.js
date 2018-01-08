import { DrawerNavigator } from 'react-navigation'
import { StyleSheet } from 'react-native'

import HomeScreen from '../screens/HomeScreen'
import OverviewScreen from '../screens/OverviewScreen'
import SettingsScreen from '../screens/SettingsScreen'
import GroupsScreen from '../screens/GroupsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TimelineScreen from '../screens/TimelineScreen'

import { Drawer } from '../components/Drawer'
import colors from '../constants/colors'

const MainDrawer = DrawerNavigator({
  HomeScreen: { screen: HomeScreen, navigationOptions: { title: 'Home' } },
  OverviewScreen: { screen: OverviewScreen, navigationOptions: { title: 'Overview' } },
  GroupsScreen: { screen: GroupsScreen, navigationOptions: { title: 'Groups' } },
  ProfileScreen: { screen: ProfileScreen, navigationOptions: { title: 'Profile' } },
  TimelineScreen: { screen: TimelineScreen, navigationOptions: { title: 'Timeline' } },
  SettingsScreen: { screen: SettingsScreen, navigationOptions: { title: 'Settings' } },
}, {
  initialRouteName: 'HomeScreen',
  contentComponent: Drawer,
  contentOptions: {
    labelStyle: {
      fontFamily: 'muli-regular',
      fontWeight: 'normal',
    },
  },
  // https://github.com/react-navigation/react-navigation/issues/3148
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
})

export { MainDrawer }
