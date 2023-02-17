import React from 'react'
import VendorStack from './VendorStack';
import AcceptedOrders from './screens/AcceptedOrders';
import EditVendorProfile from './screens/EditVendorProfile'
import ChangePassword from './screens/ChangePassword';
import VendorOrderDetails from './screens/VendorOrderDetails'
// Help Screens
import MyAccount from './screens/help/MyAccount';
import SafetyConcerns from './screens/help/SafetyConcerns';
import PaymentsandRefunds from './screens/help/PaymentsandRefunds';
import ForgotPassword from './screens/help/ForgotPassword';
import OrderDetails from './screens/OrderDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorHome from './screens/VendorHome';


const Stack = createNativeStackNavigator();  


const VendorHomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='VendorStack'>
           <Stack.Screen name='VendorStack' component={VendorStack} options={{headerShown:false}}/>
           <Stack.Screen name='VendorHome' component={VendorHome}/>
           <Stack.Screen name='AcceptedOrders' component={AcceptedOrders} options={{headerShown:false}}/>
           <Stack.Screen name='EditVendorProfile' component={EditVendorProfile} options={{headerShown:false}}/>
           <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>
           <Stack.Screen name="VendorOrderDetails" component={VendorOrderDetails} options={{headerShown:false}}/>
           <Stack.Screen name="MyAccount" component={MyAccount} options={{headerShown:false}}/>
           <Stack.Screen name="SafetyConcerns" component={SafetyConcerns} options={{headerShown:false}}/>
           <Stack.Screen name="PaymentsandRefunds" component={PaymentsandRefunds} options={{headerShown:false}}/>
           <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
           <Stack.Screen name="OrderDetails" component={OrderDetails} options={{headerShown:false}}/>
         </Stack.Navigator> 
  )
}



export default VendorHomeStack;