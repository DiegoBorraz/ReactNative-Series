import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginPage from './src/pages/LoginPage';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: "Bem Vindo",
    }
  },
}, {
  defaultNavigationOptions: {
    title: "Series!",
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#6ca2f7',
      borderBottomCollor: '#C5C5C5',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
      flexGrow:1,
      textAlign: 'center',
    }
  }
});

export default createAppContainer(AppNavigator);