
import React from "react";
import {useState}  from 'react'
import { ImageBackground, Button, TextInput, Platform,ScrollView, StyleSheet, View, Image, Text } from "react-native";
import { StatusBar } from "react-native-web";
import COLORS from "../components/colors";
import { Formik } from 'formik'
import LoginScreen from "./LoginScreen";
import SignUp from "./SignUp";

function WelcomeScreen({navigation}) {


  return (
<View style={{backgroundColor:"#fff"}}>
<View style={styles.logoContainer} >
    <ImageBackground  
     style={styles.logo}
     source={require('../assets/logo2.png')}
     resizeMode="cover" >
    </ImageBackground>
    <Text style={styles.tagline}>Event Planners</Text>
</View>

{/* Bottom View */}
  <View style={{paddingTop:200}}>
   <View style={styles.bottomView}>
    <Text style={{color:'white', fontSize:30, padding:10, fontWeight:'bold'}}>Welcome</Text>
    <Text style={{padding:7,color:'white', fontSize:19,}}>
    The Blue Jay Event Planners Application Company aims to get people in touch with event organization companies and companies with vendors to book and execute event by providing various services online such as catering, music photography and what not!.
    </Text>


    
    <View style={styles.container}>
      <View style={styles.button}>
      <Button onPress={()=>navigation.navigate('LoginScreen')} title="SignIn"
        color='#9370DB'
      /> 
      </View>
     
      <View style={styles.button} >
      <Button onPress={()=>navigation.navigate('SignUp')} title="SignUp"
        color='#9370DB'
        
      />
      </View>
    </View>
     
</View>
    </View>
    

</View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 280,
    height: 220,
  
  },
  logoContainer: {
    top:110,
    backgroundColor:"#fff",
    alignItems: "center",
    justifyContent:"center",
    
  },

 brandView :{
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
 },
 
  bottomView:{
  backgroundColor : COLORS.primary,
  paddingTop:"1%",
  paddingLeft:8,
  paddingBottom:15,
  width:'100%',
  height:450,
  borderTopStartRadius:60,
  borderTopEndRadius:60, 
 },

   tagline:{
    position: "absolute",
    paddingTop:"60%",
    fontSize:25,

     fontWeight:"bold",
    textTransform:"uppercase",
    color:COLORS.primary,
   },
 
   
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:25,
    borderRadius: 100,
    marginBottom:15,
    marginHorizontal:12

  },
  button: {
    backgroundColor: '#9370DB',
    width: '45%',
    height: 40,
  }

});

export default WelcomeScreen;
