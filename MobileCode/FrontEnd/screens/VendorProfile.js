import { StyleSheet, Text, View,TextInput,TouchableOpacity , ScrollView ,Button, StatusBar,Image,Platform} from 'react-native'
import colors from '../components/colors';
import React,  { useState, useEffect,useContext } from 'react'
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

import {UserContext} from '../Contexts'

const VendorProfile = ({navigation}) => {
 

  
  const [user,setUser] = useContext(UserContext)

  return (
    <ScrollView  style={{flex:1, backgroundColor:'#fff', }} contentContainerStyle={{justifyContent:'center',
    alignItems:'center'}} >
  
    
    <View >

        <View >
        <Image source={{uri : user.image}} style={styles.profileImage} />
        </View>
   

    <View style={styles.inputContainer} >
        <MaterialCommunityIcons name="account"  size={34} style={styles.icon}/>
        <View  style={styles.options}> 
        <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.vendor_name}</Text>
        </View>
    </View>


       
    <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="email"  size={34} style={styles.icon}/>
          <View  style={styles.options}> 
          <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.email}</Text>
          </View>
    </View>


    <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="phone"  size={34} style={styles.icon}/>
          <View  style={styles.options}> 
          <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.phone_no}</Text>
          </View>
    </View>


    <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="city"  size={34} style={styles.icon}/>
          <View  style={styles.options}> 
          <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.city}</Text>
          </View>
    </View>

    <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="home"  size={34} style={styles.icon}/>
          <View  style={styles.options}> 
          <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.address}</Text>
          </View>
    </View>

    <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="currency-usd"  size={34} style={styles.icon}/>
          <View  style={styles.options}> 
          <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.price_range}</Text>
          </View>
    </View>

    
            
    <View style={styles.inputContainer} >
          <MaterialCommunityIcons name="clock"  size={34} style={styles.icon}/>
          <View  style={styles.options}> 
          <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.available_hours}</Text>
          </View>
    </View>

           <View style={styles.buttonContainer}> 
            <TouchableOpacity style={styles.editPassword}
             onPress={()=> navigation.navigate('ChangePassword') } >
            <Text style={{ marginLeft:15, fontSize: 20,  fontWeight: 'bold',  color: colors.white,   }}> Change Password </Text>
            <MaterialCommunityIcons name="playlist-edit"  size={34} style={styles.passwordIcon}/> 
            </TouchableOpacity>
            </View>

         
           <View style={styles.buttonContainer}> 
           <TouchableOpacity  style={styles.editButton}
            onPress={()=> navigation.navigate('EditVendorProfile')}>
             <Text style={{ paddingTop:5,paddingBottom:5, fontSize: 23,  fontWeight: 'bold',  color: colors.white,   }}>Edit</Text>
           </TouchableOpacity> 
            </View>
       


       </View>
    

     </ScrollView>

  
  );
}

const styles = StyleSheet.create({

 password:{
   borderColor :colors.white,
    margin:3,
    width:280,
    fontSize:20,
    borderWidth:2,
    elevation:20,
    borderRadius:15,
    backgroundColor:'white',
    justifyContent:'space-between',
    alignItems:'center',
 },
 
 options: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop:10,
   paddingLeft:10,
   width:'75%',
   height:50,
   borderColor :colors.white,
   elevation:20,
   borderRadius:15,
   backgroundColor:colors.white
   },
    container: {
     flex: 1,
     borderRadius: 100,
     justifyContent:'center',
     alignItems:'center',
     padding:35
   },
   
  icon:{
  color:colors.primary,
  margin:10,
  marginTop:15
 
  },
  passwordIcon:{
   color:colors.white,
   margin:10,
  },
 
 editPassword: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop:10,
   width:240,
   borderColor :colors.primary,
   elevation:20,
   borderRadius:15,
   backgroundColor:colors.primary
   },
   editButton:{
     justifyContent:'center',
     alignItems:'center',
     marginTop:10,
     width:240,
     borderColor :colors.primary,
     borderWidth:2,
     elevation:20,
     borderRadius:15,
     backgroundColor:colors.primary,
   },
   buttonContainer:{
       justifyContent:'center',
       alignItems:'center',
       paddingLeft:50,
   },
  inputContainer:{
   flexDirection:'row',
   color:colors.white,
   paddingLeft:20
   
 
  },
  profileImage:{
  
     height: 180,
     width: 380,
     borderRadius: 20,
     marginBottom:5,
     marginLeft:10
 
 
  },

});
export default VendorProfile;