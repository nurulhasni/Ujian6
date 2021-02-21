/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Form from './Screen/Form/Form'
import Home from './Screen/Home/Home'
import User from './Screen/User/User'
import EditUser from './Screen/EditUser/EditUser'


const Stack = createStackNavigator();
class App extends Component {




  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Edit User" component={EditUser} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

export default App;
