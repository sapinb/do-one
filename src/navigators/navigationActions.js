import { NavigationActions } from 'react-navigation'

export const resetTo = ({ routeName, params, action }) =>
  NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName, params, action })
    ],
  })
