import { DrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import OverviewScreen from '../screens/OverviewScreen'
import SettingsScreen from '../screens/SettingsScreen'
import GroupsScreen from '../screens/GroupsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TimelineScreen from '../screens/TimelineScreen'
import CalendarScreen from '../screens/CalendarScreen'

import { Drawer, getDrawerLabel } from '../components/Drawer'

const MainDrawer = DrawerNavigator({
  HomeScreen: { screen: HomeScreen, navigationOptions: { drawerLabel: getDrawerLabel('Home', true) } },
  CalendarScreen: { screen: CalendarScreen, navigationOptions: { drawerLabel: getDrawerLabel('Calendar') } },
  OverviewScreen: { screen: OverviewScreen, navigationOptions: { drawerLabel: getDrawerLabel('Overview') } },
  GroupsScreen: { screen: GroupsScreen, navigationOptions: { drawerLabel: getDrawerLabel('Groups') } },
  ProfileScreen: { screen: ProfileScreen, navigationOptions: { drawerLabel: getDrawerLabel('Profile') } },
  TimelineScreen: { screen: TimelineScreen, navigationOptions: { drawerLabel: getDrawerLabel('Timeline') } },
  SettingsScreen: { screen: SettingsScreen, navigationOptions: { drawerLabel: getDrawerLabel('Settings') } },
}, {
  initialRouteName: 'HomeScreen',
  contentComponent: Drawer,
})

export { MainDrawer }
