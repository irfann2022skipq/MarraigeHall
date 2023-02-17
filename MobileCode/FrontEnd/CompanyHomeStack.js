import { View, Text } from 'react-native'
import React from 'react'
import VendorDetails from './screens/VendorDetails';
import CompanyHome from './screens/CompanyHome';
import CatererBookingForm from './screens/company/CatererBookingForm';
import RateVendors from './screens/company/RateVendors';
import Rating from './screens/Rating';
import DecorationBookingForm from './screens/company/DecorationBookingForm';
import VenueBookingForm from './screens/company/VenueBookingForm';
import PhotographyBookingForm from './screens/company/PhotographyBookingForm';
import CompanyStack from './screens/company/CompanyStack';
import EditCompanyProfile from './screens/EditCompanyProfile';
import ChangePassword from './screens/ChangePassword';
import CompanyOrderDetails from './screens/company/CompanyOrderDetails';
import AcceptedOrders from './screens/AcceptedOrders'
import HireVendors from './screens/company/HireVendors';
import CatererOrderDetails from './screens/company/CatererOrderDetails'
import DecorationOrderDetails from './screens/company/DecorationOrderDetails'
import VenueOrderDetails from './screens/company/VenueOrderDetails'
import PhotographerOrderDetails from './screens/company/PhotographerOrderDetails'


// Help Screens
import MyAccount from './screens/help/MyAccount';
import SafetyConcerns from './screens/help/SafetyConcerns';
import PaymentsandRefunds from './screens/help/PaymentsandRefunds';
import ForgotPassword from './screens/help/ForgotPassword';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();  


const CompanyHomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='CompanyStack'>
           <Stack.Screen name='CompanyStack' component={CompanyStack} initialParams={{date: undefined, o_id: undefined}} options={{headerShown:false}}/>
           <Stack.Screen name='Home' component={CompanyHome} />
           <Stack.Screen name='VendorDetails' component={VendorDetails} options={{headerShown:false}}/>
           <Stack.Screen name='CatererBookingForm' component={CatererBookingForm} options={{headerShown:false}}/>
           <Stack.Screen name='DecorationBookingForm' component={DecorationBookingForm} options={{headerShown:false}}/>
           <Stack.Screen name='VenueBookingForm' component={VenueBookingForm} options={{headerShown:false}}/>
           <Stack.Screen name='PhotographyBookingForm' component={PhotographyBookingForm} options={{headerShown:false}}/>
           <Stack.Screen name='EditCompanyProfile' component={EditCompanyProfile} options={{headerShown:false}}/>
           <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>
           <Stack.Screen name="RateVendors" component={RateVendors} options={{headerShown:false}}/>
           <Stack.Screen name="Rating" component={Rating} options={{headerShown:false}}/>
           <Stack.Screen name="MyAccount" component={MyAccount} options={{headerShown:false}}/>
           <Stack.Screen name="SafetyConcerns" component={SafetyConcerns} options={{headerShown:false}}/>
           <Stack.Screen name="PaymentsandRefunds" component={PaymentsandRefunds} options={{headerShown:false}}/>
           <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
           <Stack.Screen name='CatererOrderDetails' component={CatererOrderDetails} options={{headerShown:false}}/>
           <Stack.Screen name='DecorationOrderDetails' component={DecorationOrderDetails} options={{headerShown:false}}/>
           <Stack.Screen name='VenueOrderDetails' component={VenueOrderDetails} options={{headerShown:false}}/>
           <Stack.Screen name='PhotographerOrderDetails' component={PhotographerOrderDetails} options={{headerShown:false}}/>
           <Stack.Screen name="CompanyOrderDetails" component={CompanyOrderDetails} options={{headerShown:false}}/>
           
           <Stack.Screen name="AcceptedOrders" component={AcceptedOrders} options={{headerShown:false}}/>
           <Stack.Screen name="HireVendors" component={HireVendors} options={{headerShown:false}}/>
          </Stack.Navigator> 
  )
}



export default CompanyHomeStack;