import React from "react";
import {useState,useEffect,useContext}  from 'react'
import { ImageBackground, Button, TextInput, Platform,Alert,ScrollView, StyleSheet, View, Image, Text } from "react-native";
import { Company_Home, User_Home, Admin_Home,Vendor_Home, Auth_Stack } from "../constants";
import WelcomeScreen from "./WelcomeScreen";
import { StatusBar } from "react-native-web";
import COLORS from "../components/colors";

import * as SecureStore from 'expo-secure-store';


import {UserContext} from '../Contexts'

// import {PORT} from"@env"


function SplashScreen({navigation}) {
  
  const [user,setUser] = useContext(UserContext)

useEffect(()=>{
 setTimeout(()=>{

  SecureStore.getItemAsync('token').then(token=>{

    if(token == ' ' || token == null){

      console.log("No token")
      navigation.navigate('WelcomeScreen')
    }else{

    console.log('splash screen',token)
    

    fetch(`https://bluejay-mobile-app.herokuapp.com/getUser`,{
                  method: "get",
                  headers: {
                      Accept: "application/json, text/plain, */*",
                      "Content-Type": "application/json",
                      token
                  }   
                
            }).then(res=>res.json()).then(result=>{
              console.log('inside splash fetch',result)
                            
              if(result.status =='ok'){

                setUser(result.data)

                                if(result.data.role == 'customer')
                                      {

                                        navigation.navigate(User_Home)
                                      
                                      }
                                else if(result.data.role == 'company')
                                      {
                                        navigation.navigate(Company_Home)
                                      }
                                else if(result.data.role == 'vendor')
                                      {
                                        navigation.navigate(Vendor_Home)
                                      }

              }else{
                  console.log(result.status)
              }

            }).catch(err=>console.log('catch',err.message))
     }  
  })
  
 },1000);
},[]);


  return (
    
   <View style={styles.container} >
  <View style={{display:"flex",justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
   <ImageBackground
   style={styles.logo}
     source={require('../assets/logo2.1.png')}
     resizeMode="cover" >
    </ImageBackground>
    <Text style={styles.tagline}>Event Booking, Planning & Execution</Text></View>


    
 </View>
  );
}

const styles = StyleSheet.create({
  
 container:{
    flex:1, 
    backgroundColor :COLORS.primary,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    display:'flex'
    
   },
   tagline:{
    // position: "absolute",
    // paddingTop:"40%",
    alignItems:'center',
    alignSelf:'center',
    fontSize:18,
    fontWeight:"bold",
    // textTransform:"uppercase",
    color:COLORS.white,
   },
 logo: {
  width: 220,
  height: 180,
  // marginLeft:'25%',
},

 

});

export default SplashScreen;