import { View, Text } from 'react-native'
import React from 'react'
import Profile from './Profile'
import MyOrders from './MyOrders'
import HelpCentre from './HelpCentre'
import Location from './Location'
import Message from './Message'
import PaymentMethod from './PaymentMethod'
import { createDrawerNavigator } from '@react-navigation/drawer'

const MyDrawer = () => {
    const Drawer = createDrawerNavigator();
  return (
       <Drawer.Navigator useLegacyImplementation>
           <Drawer.Screen name='profile' component={Profile} />
            <Drawer.Screen name='MyOrders' component={MyOrders} /> 
            <Drawer.Screen name='Location' component={Location} />
            <Drawer.Screen name='Message' component={Message} />
            <Drawer.Screen name='HelpCentre' component={HelpCentre} />
            <Drawer.Screen name='PaymentMethod' component={PaymentMethod} />
       </Drawer.Navigator>
  )
}

export default MyDrawer