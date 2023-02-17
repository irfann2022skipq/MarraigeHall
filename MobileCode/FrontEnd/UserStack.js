import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import MyOrders from './screens/MyOrders';
import Location from './screens/Location';
import HelpCentre from './screens/HelpCentre';
import PaymentMethod from './screens/PaymentMethod';
import Notifications from './screens/Notifications'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from './components/CustomDrawer';
import { FontAwesome } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();


const UserStack = ({route,navigation}) => {
  // console.log('params', route.params);

  return (
    <Drawer.Navigator 
    drawerContent={props=><CustomDrawer {...props} /> } 
    screenOptions={{
      drawerActiveBackgroundColor:'purple',
      drawerActiveTintColor:'white',
      drawerInactiveTintColor:'#333'
    }}
    useLegacyImplementation>
          <Drawer.Screen name='Home' initialParams={{ params: route.params }} component={HomeScreen} 
            options={{
              drawerIcon:({focused,size})=>(
                <FontAwesome
                name='home'
                size={size}
                color={focused? 'white' : 'purple'}
                
                />
              ),
            }}
            
          />
          <Drawer.Screen name=' Profile' component={Profile}
              options={{
                drawerIcon:({focused,size})=>(
                  <FontAwesome
                  name='user'
                  size={size}
                  color={focused? 'white' : 'purple'}
                  />
                ),
              }}
          />
          <Drawer.Screen name='My Orders' component={MyOrders} 
              options={{
                drawerIcon:({focused,size})=>(
                  <FontAwesome
                  name='shopping-cart'
                  size={size}
                  color={focused? 'white' : 'purple'}
                  />
                ),
              }}
          /> 
          <Drawer.Screen name='Notifications' component={Notifications} 
                  options={{
                    drawerIcon:({focused,size})=>(
                      <FontAwesome
                      name='bell'
                      size={size}
                      color={focused? 'white' : 'purple'}
                      />
                    ),
                  }}
                  />
          <Drawer.Screen name='Payment' component={PaymentMethod} 
                  options={{
                    drawerIcon:({focused,size})=>(
                      <FontAwesome
                      name='cc-visa'
                      size={size}
                      color={focused? 'white' : 'purple'}
                      />
                    ),
                  }}
          />
          <Drawer.Screen name=' Help Centre' component={HelpCentre}
                  options={{
                    drawerIcon:({focused,size})=>(
                      <FontAwesome
                      name='question-circle'
                      size={size}
                      color={focused? 'white' : 'purple'}
                      />
                    ),
                  }}
           />
    </Drawer.Navigator>
  )
}



export default UserStack