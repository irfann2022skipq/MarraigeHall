import { View, Text } from 'react-native'
import React from 'react'
import WelcomeScreen from './screens/WelcomeScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUp from './screens/SignUp';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();  


const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='SplashScreen'>
     <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}}/>
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown:false}}/>
           <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
           <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
          
         </Stack.Navigator> 
  )
}



export default AuthStack