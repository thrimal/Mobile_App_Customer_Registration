/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { Text, View } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import New from './components/New';
import {} from 'react-native-gesture-handler'
import Customers from './components/Customers';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen'
import Login from './components/Login';
import { createStackNavigator } from '@react-navigation/stack'
import Splash from './components/Splash';

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends Component {
  componentDidMount() {
    // setTimeout(() => {
    //   SplashScreen.hide()
    // }, 10);
    SplashScreen.hide();
  }
  render() {
    return (
      <NavigationContainer>

        {/* <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Customers') {
              iconName = 'list';
              size=focused ? 35:30;
              color = focused ? 'blue' : '#555';
            } else if (route.name === 'New') {
              iconName = 'address-book';
              size=focused ? 35:30;
              color = focused ? 'blue' : '#555';
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}

        tabBarOptions={{
          showLabel:false,
        }}
        > */}
        {/* <Tab.Navigator>
          <Tab.Screen name="Login" component={Login}/>
          <Tab.Screen name="New" component={New} />
          <Tab.Screen name="Customers" component={Customers} />
        </Tab.Navigator> */}
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Splash}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="New" component={New} />
          <Stack.Screen name="Customers" component={Customers} />
        </Stack.Navigator>
      </NavigationContainer>

    )
  }
}



