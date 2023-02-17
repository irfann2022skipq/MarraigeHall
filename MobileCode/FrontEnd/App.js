import React from 'react'
import { useState,useEffect } from "react";
import 'react-native-gesture-handler'
import RoutNavigator from './RoutNavigator';
import * as SecureStore from 'expo-secure-store';

import { OrderContext } from './Contexts';
import { CvOrderContext } from './Contexts';
import { UserContext } from './Contexts';
import { DateContext } from './Contexts';


export default function App() {

    const [orderC, setOrderC] = useState(false)
    const [cvOrderC, setCvOrderC] = useState(false)
    const [user,setUser] = useState([])
    const [date, setDate] = useState(new Date());
    
    
 return (
    <>
        <UserContext.Provider value={[user,setUser]}>
            <DateContext.Provider value={[date,setDate]}>
                <OrderContext.Provider value={[orderC,setOrderC]}>
                    <CvOrderContext.Provider value={[cvOrderC,setCvOrderC]}>
                        <RoutNavigator/>
                    </CvOrderContext.Provider>
                </OrderContext.Provider>
            </DateContext.Provider>
        </UserContext.Provider>
    </>
 
    
 );
 }

 