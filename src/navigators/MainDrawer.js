import { DrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import OverviewScreen from '../screens/OverviewScreen'
import SettingsScreen from '../screens/SettingsScreen'
import GroupsScreen from '../screens/GroupsScreen'

const MainDrawer = DrawerNavigator({
  HomeScreen: { screen: HomeScreen },
  OverviewScreen: { screen: OverviewScreen },
  SettingsScreen: { screen: SettingsScreen },
  GroupsScreen: { screen: GroupsScreen }
}, {
  initialRouteName: 'HomeScreen',
  // https://github.com/react-navigation/react-navigation/issues/3148
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
})

export { MainDrawer }
