import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 

import { UserOrderDetails,VendorOrderDetails,CompanyOrderDetails,CompanyRcvedOdrDetls,VCompany_Home, MyAccount ,SecurityConcerns,ForgotPassword,Payment_Refunds, CMyAccount,CSecurityConcerns,CForgotPassword,CPayment_Refunds,VMyAccount,VSecurityConcerns,VForgotPassword,VPayment_Refunds, Auth_Stack, Company_Booking,Admin_Company, User_Home,EditProfile,EditCompanyProfile,EditVendorProfile,Change_Pass, Change_CPass,Change_VPass, Company_Home, Vendor_Booking,Admin_Home, Vendor_Home, HireVendors } from './constants';

import AuthStack from './AuthStack';
import UserHomeStack from './UserHomeStack';
import CompanyHomeStack from './CompanyHomeStack';
import VendorHomeStack from './VendorHomeStack';

const MainStack =createStackNavigator();

function RoutNavigator(){
    return (
     <NavigationContainer >
          <MainStack.Navigator initialRouteName={Auth_Stack}>
             <MainStack.Screen
             name={Auth_Stack}
             component={AuthStack}
             options={{headerShown:false}}
             />

   
             <MainStack.Screen
             name={User_Home}
             component={UserHomeStack}
             options={{headerShown:false}}
             />
             
             <MainStack.Screen
                name={Company_Booking}
                component={UserHomeStack}
                options={{headerShown:false}}
             />
                <MainStack.Screen
                name={EditProfile}
                component={UserHomeStack}
                options={{headerShown:false}}
             />

             <MainStack.Screen
                name={Company_Home}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />

               <MainStack.Screen
                name={Vendor_Booking}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />

              <MainStack.Screen
                name={EditCompanyProfile}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={EditVendorProfile}
                component={VendorHomeStack}
                options={{headerShown:false}}
             />

               <MainStack.Screen
                name={Change_Pass}
                component={UserHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={Change_CPass}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />

             <MainStack.Screen
                name={Change_VPass}
                component={VendorHomeStack}
                options={{headerShown:false}}
             />



            <MainStack.Screen
                name={Vendor_Home}
                component={VendorHomeStack}
                options={{headerShown:false}}
             />
             
              <MainStack.Screen
                name={MyAccount}
                component={UserHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={SecurityConcerns}
                component={UserHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={Payment_Refunds}
                component={UserHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={ForgotPassword}
                component={UserHomeStack}
                options={{headerShown:false}}
             />

             {/* Help Screens for Company*/}
             <MainStack.Screen
                name={CMyAccount}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={CSecurityConcerns}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={CPayment_Refunds}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={CForgotPassword}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />

               {/* Help Screens for Vendor*/}
               <MainStack.Screen
                name={VMyAccount}
                component={VendorHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={VSecurityConcerns}
                component={VendorHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={VPayment_Refunds}
                component={VendorHomeStack}
                options={{headerShown:false}}
             />
               <MainStack.Screen
                name={VForgotPassword}
                component={VendorHomeStack}
                options={{headerShown:false}}
             />


            {/*Order Details for  user, vendor and customer  */}
             
             <MainStack.Screen
                name={UserOrderDetails}
                component={UserHomeStack}
                options={{headerShown:false}}
             />

           <MainStack.Screen
                name={VendorOrderDetails}
                component={VendorHomeStack}
                options={{headerShown:false}}
             />

            <MainStack.Screen
                name={CompanyOrderDetails}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />
             <MainStack.Screen
                name={HireVendors}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />
    {/* company home for higher vendor */}
           <MainStack.Screen
                name={VCompany_Home}
                component={CompanyHomeStack}
                options={{headerShown:false}}
             />





            
          </MainStack.Navigator>
     </NavigationContainer>
    )
}

export default RoutNavigator;