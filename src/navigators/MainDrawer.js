import { DrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import OverviewScreen from '../screens/OverviewScreen'
import SettingsScreen from '../screens/SettingsScreen'
import GroupsScreen from '../screens/GroupsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TimelineScreen from '../screens/TimelineScreen'

import { Drawer, getDrawerLabel } from '../components/Drawer'

const MainDrawer = DrawerNavigator({
  HomeScreen: { screen: HomeScreen, navigationOptions: { drawerLabel: getDrawerLabel('Home', true) } },
  OverviewScreen: { screen: OverviewScreen, navigationOptions: { drawerLabel: getDrawerLabel('Overview') } },
  GroupsScreen: { screen: GroupsScreen, navigationOptions: { drawerLabel: getDrawerLabel('Groups') } },
  ProfileScreen: { screen: ProfileScreen, navigationOptions: { drawerLabel: getDrawerLabel('Profile') } },
  TimelineScreen: { screen: TimelineScreen, navigationOptions: { drawerLabel: getDrawerLabel('Timeline') } },
  SettingsScreen: { screen: SettingsScreen, navigationOptions: { drawerLabel: getDrawerLabel('Settings') } },
}, {
  initialRouteName: 'HomeScreen',
  contentComponent: Drawer,
  // https://github.com/react-navigation/react-navigation/issues/3148
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
})

export { MainDrawer }
