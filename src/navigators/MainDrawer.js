import { DrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'

const MainDrawer = DrawerNavigator({
  HomeScreen: { screen: HomeScreen }
})

export { MainDrawer }
