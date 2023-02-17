import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import CompanyDetails from './screens/CompanyDetails';
import BookingForm from './screens/BookingForm';
import EditProfile from  './screens/EditProfile';
import ChangePassword from './screens/ChangePassword';
import MyAccount from './screens/help/MyAccount';
import SafetyConcerns from './screens/help/SafetyConcerns';
import PaymentsandRefunds from './screens/help/PaymentsandRefunds';
import ForgotPassword from './screens/help/ForgotPassword';
import Rating from './screens/Rating'
import OrderDetails from './screens/OrderDetails';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserStack from './UserStack';


const Stack = createNativeStackNavigator();  


const UserHomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='UserStack'>

          <Stack.Screen name='UserStack' component={UserStack} options={{headerShown:false}}/>
           <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
           <Stack.Screen name='CompanyDetails' component={CompanyDetails} options={{headerShown:false}}/>
           <Stack.Screen name='BookingForm' component={BookingForm} options={{headerShown:false}}/>
           <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
           <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>
           <Stack.Screen name="MyAccount" component={MyAccount} options={{headerShown:false}}/>
           <Stack.Screen name="SafetyConcerns" component={SafetyConcerns} options={{headerShown:false}}/>
           <Stack.Screen name="PaymentsandRefunds" component={PaymentsandRefunds} options={{headerShown:false}}/>
           <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
           <Stack.Screen name="OrderDetails" component={OrderDetails} options={{headerShown:false}}/>
           <Stack.Screen name="Rating" component={Rating} options={{headerShown:false}}/>
         </Stack.Navigator> 
  )
}



export default UserHomeStack