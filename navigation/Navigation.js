import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Confirm from '../screens/Confirm';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import ProductDetail from '../screens/ProductDetail';
import Header from '../components/Header';

const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6646ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Tauros'}}
        />
        <Stack.Screen
          name="Confirm"
          component={Confirm}
          options={{title: 'Tauros'}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Tauros'}}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
