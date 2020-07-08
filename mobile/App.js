
  
import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../mobile/src/Login';
import Chat from '../mobile/src/Chat';
import OTP from '../mobile/src/OTP';
import Test from '../mobile/src/Test';
import ProductList from '../mobile/src/ProductList';
import 'react-native-gesture-handler';


 class App extends Component {

  render(){
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen options={{headerShown: false}} name="Test" component={Test} />
      <Stack.Screen options={{headerShown: false}} name="ProductList" component={ProductList} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Chat" component={Chat} />
        <Stack.Screen options={{headerShown: false}} name="OTP" component={OTP} />
      </Stack.Navigator>
    </NavigationContainer>)
  }
  
  }
  export default App; 
  

