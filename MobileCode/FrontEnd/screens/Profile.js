import { StyleSheet, Text, View,TextInput,TouchableOpacity, ScrollView ,Button,Image,StatusBar, InputAccessoryView} from 'react-native'
import colors from '../components/colors';
import React,{useState,useEffect,useContext} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import {UserContext} from '../Contexts'

const Profile = ({route,navigation}) => {

  
  const [user,setUser] = useContext(UserContext)


  return (
    <View style={{flex:1, backgroundColor:'#fff', }} contentContainerStyle={{justifyContent:'center',
    alignItems:'center'}} >
   

     
        <View>
        <View style={styles.buttonContainer}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        </View>
     

       
        <View style={styles.inputContainer} >
            <MaterialCommunityIcons name="account"  size={30} style={styles.icon}/>
            <View  style={styles.options}> 
            <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.username}</Text>
            </View>
        </View>
           
        <View style={styles.inputContainer} >
            <MaterialCommunityIcons name="email"  size={30} style={styles.icon}/>
            <View  style={styles.options}> 
            <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.email}</Text>
            </View>
        </View>
           
        <View style={styles.inputContainer} >
            <MaterialCommunityIcons name="phone"  size={30} style={styles.icon}/>
            <View  style={styles.options}> 
            <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.phone_no}</Text>
            </View>
        </View>
           
        <View style={styles.inputContainer} >
            <MaterialCommunityIcons name="city"  size={30} style={styles.icon}/>
            <View  style={styles.options}> 
            <Text style={{  fontSize: 20,  color: colors.dark, marginLeft:2 }}>{user.city}</Text>
            </View>
        </View>
          
            <View style={styles.buttonContainer}> 
            <TouchableOpacity style={styles.editPassword}
             onPress={()=> navigation.navigate('ChangePassword') } >
            <Text style={{ marginLeft:15, fontSize: 23,  fontWeight: 'bold',  color: colors.white,   }}> Change Password </Text>
            <MaterialCommunityIcons name="playlist-edit"  size={34} style={styles.passwordIcon}/> 
            </TouchableOpacity>
            </View>

            
           
           
         
           <View style={styles.buttonContainer}> 
           <TouchableOpacity  style={styles.editButton}
            onPress={()=> navigation.navigate('EditProfile')}>
             <Text style={{ paddingTop:5,paddingBottom:5, fontSize: 23,  fontWeight: 'bold',  color: colors.white,   }}>Edit</Text>
           </TouchableOpacity> 
            </View>
       

 


     </View>

  
    
 </View>
  );
}

const styles = StyleSheet.create({
  

   input:{
   margin:6,
   padding:8,
   width:280,
   fontSize:20,
   borderColor :colors.white,
   elevation:20,
   borderRadius:15,
   backgroundColor:'white'

   },
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
  marginTop:12,
  padding:10,
  width:'65%',
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
   button:{
    backgroundColor:colors.primary,
    width: '35%',
    height: 35,

  
 },
 buttonI:{
  backgroundColor: colors.primary,
  width: '40%',
  height: 35,
  marginTop:20,
  marginBottom:20,
  marginLeft:'30%',
 }
 ,
 icon:{
 color:colors.primary,
 margin:20,

 },
 passwordIcon:{
  color:colors.white,
  margin:10,
 },

editPassword: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop:25,
  width:280,
  borderColor :colors.primary,
  borderWidth:2,
  elevation:20,
  borderRadius:15,
  backgroundColor:colors.primary
  },
  editButton:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    width:280,
    borderColor :colors.primary,
    borderWidth:2,
    elevation:20,
    borderRadius:15,
    backgroundColor:colors.primary,
  },
  buttonContainer:{
      justifyContent:'center',
      alignItems:'center',
  },
 inputContainer:{
  flexDirection:'row',
  color:colors.white, 
  

 },
 profileImage:{
 
    height: 180,
    width: '50%',
    borderRadius: 20,
    marginBottom:20,

 },

});
export default Profile;